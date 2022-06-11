import { _ } from 'lodash';

export const getRandomOfColors = () => {
  const colors = [
    '#CCE0FF',
    '#FFD2CC',
    '#FFE2BD',
    '#F8E6A0',
    '#BAF3DB',
    '#C1F0F5',
    '#DFD8FD',
    "#60C6D2",
    "#FDD0EC",
    '#FDD0EC',
  ];

  return colors[_.random(0, colors.length, false)];
};
