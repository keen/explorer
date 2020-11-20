import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { colors } from '@keen.io/colors';

const FILENAME = 'chart';
const BG_COLOR = colors.white[500];

export const exportToImage = ({
  fileName = FILENAME,
  quality,
  backgroundColor = BG_COLOR,
  node,
}: {
  fileName: string;
  node: HTMLElement;
  quality?: number;
  backgroundColor?: string;
}) => {
  if (quality) {
    domtoimage
      .toBlob(node, { quality, bgcolor: backgroundColor })
      .then((blob) => {
        saveAs(blob, `${fileName}.jpeg`);
      });
  } else {
    domtoimage.toBlob(node).then((blob) => {
      saveAs(blob, `${fileName}.png`);
    });
  }
};
