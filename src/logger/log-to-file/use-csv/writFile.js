import fs from 'fs';

export const writFile = function(filePath, content) {
	fs.writeFileSync(filePath, content, {
		flag: 'a+'
	});
};
