import applyWrapFormat from './applyWrapFormat';
import applyWrapFormatNewLines from './applyWrapFormatNewLines';
import applyListFormat from './applyListFormat';
import applyWebLinkFormat from './applyWebLinkFormat';

export default [
  {
    key: 'BOLD',
    title: 'B',
    icon: 'bold',
    iconType: 'FontAwesome',
    type: 'style',
  },
  {
    key: 'ITALIC',
    title: 'I',
    icon: 'italic',
    iconType: 'FontAwesome',
    type: 'style',
  },
  {
    key: 'header-one',
    title: 'H1',
    icon: 'format-size',
    iconType: 'MaterialCommunityIcons',
    type: 'block',
  },
  {
    key: 'unordered-list-item',
    title: 'L',
    icon: 'list',
    iconType: 'FontAwesome',
    type: 'block',
  },
  {
    key: 'blockquote',
    title: 'C',
    icon: 'ios-code',
    type: 'block',
  },
  {
    key: 'UNDERLINE',
    title: 'U',
    icon: 'underline',
    iconType: 'FontAwesome',
    type: 'block',
  },
  {
    key: 'S',
    title: 'S',
    wrapper: '~~',
    icon: 'strikethrough',
    iconType: 'FontAwesome',
    onPress: applyWrapFormat,
  },
  {
    key: '>',
    title: '>',
    prefix: '>',
    icon: 'ios-quote',
    onPress: applyListFormat,
  },
  {
    key: 'code-block',
    title: 'CC',
    icon: 'ios-code-working',
    type: 'block',
  },
  {
    key: 'link',
    title: 'WEB',
    icon: 'link-2',
    iconType: 'Feather',
    onPress: applyWebLinkFormat,
  },
  // {
  //   key: 'H2',
  //   title: 'H2',
  //   prefix: '##',
  //   onPress: applyListFormat,
  // },
  // {
  //   key: 'H3',
  //   title: 'H3',
  //   prefix: '###',
  //   onPress: applyListFormat,
  // },
  // {
  //   key: 'H4',
  //   title: 'H4',
  //   prefix: '####',
  //   onPress: applyListFormat,
  // },
  // {
  //   key: 'H5',
  //   title: 'H5',
  //   prefix: '#####',
  //   onPress: applyListFormat,
  // },
  // {
  //   key: 'H6',
  //   title: 'H6',
  //   prefix: '######',
  //   onPress: applyListFormat,
  // },
];
