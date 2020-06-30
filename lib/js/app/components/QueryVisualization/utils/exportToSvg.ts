import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { colors } from '@keen.io/colors';

const FILENAME = 'chart';

export const exportToSvg = ({
  quality = 1,
  backgroundColor = colors.white[500],
  node,
}: {
  node: Element;
  quality: number;
  backgroundColor: string;
}) => {
  if (quality) {
    domtoimage
      .toBlob(node, { quality, bgcolor: backgroundColor })
      .then((blob) => {
        saveAs(blob, `${FILENAME}.jpeg`);
      });
  } else {
    domtoimage.toBlob(node).then((blob) => {
      saveAs(blob, `${FILENAME}.png`);
    });
  }
};
