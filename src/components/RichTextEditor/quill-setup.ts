import Quill from 'quill';
import QuillTableBetter from 'quill-table-better';

import 'quill-table-better/dist/quill-table-better.css';
// quill2-emoji self-registers its own modules on import
import 'quill2-emoji';
import 'quill2-emoji/dist/style.css';

export function setupQuill() {
	Quill.register(
		{
			'modules/table-better': QuillTableBetter,
		},
		true
	);
}
