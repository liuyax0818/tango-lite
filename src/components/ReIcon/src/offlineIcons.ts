import { addIcon } from '@iconify/vue'
import RiAddCircle from '~icons/ri/add-circle-line?raw'
import RiChartBox from '~icons/ri/bar-chart-box-line?raw'
import RiDelete from '~icons/ri/delete-bin-line?raw'
import RiCloudDownload from '~icons/ri/download-cloud-2-line?raw'
import RiEdit from '~icons/ri/edit-2-line?raw'
import RiCopy from '~icons/ri/file-copy-2-line?raw'
import RiFolder from '~icons/ri/folder-2-line?raw'
import RiSetting from '~icons/ri/settings-line?raw'

const icons = [
  ['ri/add-circle-line', RiAddCircle],
  ['ri/bar-chart-box-line', RiChartBox],
  ['ri/delete-bin-line', RiDelete],
  ['ri/download-cloud-2-line', RiCloudDownload],
  ['ri/edit-2-line', RiEdit],
  ['ri/file-copy-2-line', RiCopy],
  ['ri/folder-2-line', RiFolder],
  ['ri/settings-line', RiSetting],
]

icons.forEach(([name, icon]) => {
  addIcon(name, getSvgInfo(icon))
})

interface SvgInfo {
  /** SVG的宽度，基于`viewBox`属性的第三个值 */
  width: number
  /** SVG的高度，基于`viewBox`属性的第四个值 */
  height: number
  /** SVG中所有`<path>`元素的`outerHTML`连接而成的字符串 */
  body: string
};

function getSvgInfo(svg: string): SvgInfo {
  const svgDOM = new DOMParser()
    .parseFromString(svg, 'image/svg+xml')
    .querySelector('svg')

  const viewBox = svgDOM.getAttribute('viewBox')
  if (!viewBox)
    throw new Error('Invalid SVG string: Missing viewBox attribute.')

  const sizeStr = viewBox.split(' ')
  const width = Number.parseInt(sizeStr[2], 10)
  const height = Number.parseInt(sizeStr[3], 10)
  const body = Array.from(svgDOM.querySelectorAll('path'))
    .map(p => p.outerHTML)
    .join(' ')
  return { width, height, body }
}
