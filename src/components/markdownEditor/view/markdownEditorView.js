import React, { useState, useEffect, Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import RNDraftView from '../../react-native-draftjs';

// Utils
import applyImageLink from './formats/applyWebLinkFormat';
import Formats from './formats/formats';

// Components
import { IconButton } from '../../iconButton';
import { StickyBar } from '../../basicUIElements';

import styles from './markdownEditorStyles';

// const ControlButton = ({ text, action, isActive }) => {
//   return (
//     <TouchableOpacity
//       style={[styles.controlButtonContainer, isActive ? { backgroundColor: 'gold' } : {}]}
//       onPress={action}
//     >
//       <Text>{text}</Text>
//     </TouchableOpacity>
//   );
// };

// const EditorToolBar = ({ activeStyles, blockType, toggleStyle, toggleBlockType }) => {
//   return (
//     <View style={styles.toolbarContainer}>
//       <ControlButton
//         text={'B'}
//         isActive={activeStyles.includes('BOLD')}
//         action={() => toggleStyle('BOLD')}
//       />
//       <ControlButton
//         text={'I'}
//         isActive={activeStyles.includes('ITALIC')}
//         action={() => toggleStyle('ITALIC')}
//       />
//       <ControlButton
//         text={'H'}
//         isActive={blockType === 'header-one'}
//         action={() => toggleBlockType('header-one')}
//       />
//       <ControlButton
//         text={'ul'}
//         isActive={blockType === 'unordered-list-item'}
//         action={() => toggleBlockType('unordered-list-item')}
//       />
//       <ControlButton
//         text={'ol'}
//         isActive={blockType === 'ordered-list-item'}
//         action={() => toggleBlockType('ordered-list-item')}
//       />
//       <ControlButton
//         text={'--'}
//         isActive={activeStyles.includes('STRIKETHROUGH')}
//         action={() => toggleStyle('STRIKETHROUGH')}
//       />
//       <ControlButton
//         text={'ul'}
//         isActive={blockType === 'unordered-list-item'}
//         action={() => toggleBlockType('unordered-list-item')}
//       />
//       <ControlButton
//         text={'ol'}
//         isActive={blockType === 'ordered-list-item'}
//         action={() => toggleBlockType('ordered-list-item')}
//       />
//       <ControlButton
//         text={'--'}
//         isActive={activeStyles.includes('STRIKETHROUGH')}
//         action={() => toggleStyle('STRIKETHROUGH')}
//       />
//     </View>
//   );
// };

const MarkupButton = ({ item, onPress }) => (
  <View style={styles.buttonWrapper}>
    <IconButton
      size={20}
      style={styles.editorButton}
      iconStyle={styles.icon}
      iconType={item.iconType}
      name={item.icon}
      onPress={onPress}
    />
  </View>
);

class EditorButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  test = (key, type) => {
    const { toggleStyle, toggleBlockType } = this.props;
    if (type === 'style') {
      toggleStyle(key);
    } else if (type === 'block') {
      toggleBlockType(key);
    }
  };

  render() {
    return (
      <StickyBar>
        <View style={styles.leftButtonsWrapper}>
          <FlatList
            data={Formats}
            keyboardShouldPersistTaps="always"
            renderItem={({ item }) => (
              <MarkupButton item={item} onPress={() => this.test(item.key, item.type)} />
            )}
            horizontal
          />
        </View>
        <View style={styles.rightButtonsWrapper}>
          {/* <IconButton
        size={20}
        style={styles.rightIcons}
        iconStyle={styles.icon}
        iconType="FontAwesome"
        name="link"
        onPress={() => Formats[9].onPress({ getState, setState })}
      /> */}
          <IconButton
            onPress={() => this.galleryRef.current.show()}
            style={styles.rightIcons}
            size={20}
            iconStyle={styles.icon}
            iconType="FontAwesome"
            name="image"
          />
          {/* <ControlButton
            text={'B'}
            isActive={activeStyles.includes('BOLD')}
            action={() => toggleStyle('BOLD')}
          /> */}
          <View style={styles.clearButtonWrapper}>
            <IconButton
              onPress={() => this.clearRef.current.show()}
              size={20}
              iconStyle={styles.clearIcon}
              iconType="FontAwesome"
              name="trash"
              backgroundColor={styles.clearButtonWrapper.backgroundColor}
            />
          </View>
        </View>
      </StickyBar>
    );
  }
}

// const EditorButtons = ({ activeStyles, blockType, toggleStyle, toggleBlockType }) => {
//   const test = key => {
//     toggleStyle('BOLD');
//   };
//   return (
//     <StickyBar>
//       <View style={styles.leftButtonsWrapper}>
//         <FlatList
//           data={Formats}
//           keyboardShouldPersistTaps="always"
//           renderItem={function({ item }) {
//             return (
//               <MarkupButton
//                 item={item}
//                 activeStyles={activeStyles}
//                 blockType={blockType}
//                 toggleStyle={toggleStyle}
//                 toggleBlockType={toggleBlockType}
//                 onPress={test}
//               />
//             );
//           }}
//           horizontal
//         />
//       </View>
//       <View style={styles.rightButtonsWrapper}>
//         {/* <IconButton
//         size={20}
//         style={styles.rightIcons}
//         iconStyle={styles.icon}
//         iconType="FontAwesome"
//         name="link"
//         onPress={() => Formats[9].onPress({ getState, setState })}
//       /> */}
//         <IconButton
//           onPress={() => this.galleryRef.current.show()}
//           style={styles.rightIcons}
//           size={20}
//           iconStyle={styles.icon}
//           iconType="FontAwesome"
//           name="image"
//         />
//         <ControlButton
//           text={'B'}
//           isActive={activeStyles.includes('BOLD')}
//           action={() => toggleStyle('BOLD')}
//         />
//         <View style={styles.clearButtonWrapper}>
//           <IconButton
//             onPress={() => this.clearRef.current.show()}
//             size={20}
//             iconStyle={styles.clearIcon}
//             iconType="FontAwesome"
//             name="trash"
//             backgroundColor={styles.clearButtonWrapper.backgroundColor}
//           />
//         </View>
//       </View>
//     </StickyBar>
//   );
// };

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
};

const App = () => {
  const _draftRef = React.createRef();
  const [activeStyles, setActiveStyles] = useState([]);
  const [blockType, setActiveBlockType] = useState('unstyled');
  const [editorState, setEditorState] = useState('');

  const editorLoaded = () => {
    _draftRef.current && _draftRef.current.focus();
  };

  const toggleStyle = style => {
    _draftRef.current && _draftRef.current.setStyle(style);
  };

  const toggleBlockType = type => {
    _draftRef.current && _draftRef.current.setBlockType(type);
  };

  useEffect(() => {
    /**
     * Get the current editor state in HTML.
     * Usually keep it in the submit or next action to get output after user has typed.
     */
    setEditorState(_draftRef.current ? _draftRef.current.getEditorState() : '');
  }, [_draftRef]);

  return (
    <View style={styles.containerStyle}>
      <RNDraftView
        onEditorReady={editorLoaded}
        style={{ flex: 1 }}
        placeholder={'Add text here...'}
        ref={_draftRef}
        onStyleChanged={setActiveStyles}
        onBlockTypeChanged={setActiveBlockType}
        styleMap={styleMap}
      />
      <EditorButtons
        activeStyles={activeStyles}
        blockType={blockType}
        toggleStyle={toggleStyle}
        toggleBlockType={toggleBlockType}
      />
    </View>
  );
};

export default App;
