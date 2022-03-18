def TEMPLATEPATH = 'https://raw.githubusercontent.com/viaacode/openshift_pipeline-jenkins-exmp/master/openshift/app_deployment-okd.yaml'
def TEMPLATENAME = 'avo2-components'
def TARGET_NS = 'shared-components'
def templatePath = 'https://raw.githubusercontent.comviaacode/avo2-components/master/openshift/app_deployment-okd.yaml'
// NOTE, the "pipeline" directive/closure from the declarative pipeline syntax needs to include, or be nested outside,
// and "openshift" directive/closure from the OpenShift Client Plugin for Jenkins.  Otherwise, the declarative pipeline engine
// will not be fully engaged.
pipeline {
    agent {
        node {
            // spin up a pod to run this build on
            label 'docker'
        }
    }
    options {
        // set a timeout of 45 minutes for this pipeline builds are way to slow need to figure out why
        timeout(time: 45, unit: 'MINUTES')
    }
    stages {
        stage('preamble') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject("shared-components") {
                            echo "Using project: ${openshift.project()}"
                            sh '''#!/bin/bash
				oc project shared-components || exit 1'''
                        }
                    }
                }
            }
        }


        stage('Build') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject("shared-components") {
                            sh '''#!/bin/bash
			   rm -f /.npmrc
			   sudo chmod -R 775 /root/.node_modules/src
			    npm --registry=https://registry.npmjs.org install && npm run build || exit 1'''
                            sh '''#!/bin/bash
			   echo "##### BUILDING DOCKER IMAGE DISABLED#####"
			    #  docker build -t docker-registry-default.apps.do-prd-okp-m0.do.viaa.be/shared-components/avo2-components:latest .
			    '''
                        }
                    }
                } // script
            } // steps
        } // stage


        stage('Publish') {
            steps {

                script {
                    openshift.withCluster() {
                        openshift.withProject("shared-components") {

                            echo "Publishing package to registry"
                            sh '''#/bin/bash
			         cp /root/npm-config .npmrc
			   	 npm publish
				 echo "removing .npmrc for install if node is the same we need to set registry for push nexus not seems to like @viaa:registry=.."
				rm -f .npmrc
		                '''
                            sh '''#/bin/bash
				echo "######PUSHING IMAGE######"
				#docker push docker-registry-default.apps.do-prd-okp-m0.do.viaa.be/shared-components/avo2-components:latest 
				'''
                        }
                    }
                } // script
            } // steps
        } // stage
        stage('Deploy') {
            steps {

                script {
                    openshift.withCluster() {
                        openshift.withProject("shared-components") {

                            echo "Apply template changes"
                            sh '''#!/bin/bash
				oc project shared-components
				oc apply -f openshift/app_deployment-okd.yaml 
				echo "rolling out app"
				oc process -l app=avo2-components -p ENV=dev -f openshift/app_deployment-okd.yaml | oc apply -f - 
				'''


                        }
                    }
                } // script
            } // steps
        } // stage
    } // stages
    post {
        always {
            // following disabled , we dont record test data for now
            //junit 'ci-results/*.xml'

            //archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', fingerprint: true
            //archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true
            //archiveArtifacts artifacts: 'ci-results/*.xml', fingerprint: true

            script {
                slackNotifier(currentBuild.currentResult)
            }
            cleanWs()
        }
    }
} // pipeline
