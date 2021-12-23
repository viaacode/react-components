import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import flowplayer from '../../static/flowplayer/flowplayer.min.js';
import '../../static/flowplayer/plugins/speed.min.js';
import '../../static/flowplayer/plugins/chromecast.min.js';
import '../../static/flowplayer/plugins/airplay.min.js';
import '../../static/flowplayer/plugins/subtitles.min.js';
import '../../static/flowplayer/plugins/hls.min.js';
import '../../static/flowplayer/plugins/cuepoints.min.js';
import '../../static/flowplayer/plugins/google-analytics.min.js';

(global as any).flowplayer = flowplayer;

configure({ adapter: new Adapter() });
