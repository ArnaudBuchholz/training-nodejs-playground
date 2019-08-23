'use strict'

/**
 * Output item info.
 *
 * @callback api.output
 *
 * @param {String} name Name of the folder item
 * @param {fs.Stats} file Folder item statistics (https://nodejs.org/api/fs.html#fs_class_fs_stats)
 */

/**
 * End output.
 *
 * @callback api.end
 */

/**
 *
 *
 * @param {String} folderPath Full path of the folder to explore
 * @param {api.output} output
 * @param {api.end} end
 */
module.exports = (filePath, output, end) => {
  end()
}
