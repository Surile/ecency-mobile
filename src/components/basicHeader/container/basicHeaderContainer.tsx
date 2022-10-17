import React from 'react';
import { withNavigation } from '@react-navigation/compat';

// Constants
import { default as ROUTES } from '../../../constants/routeNames';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setHidePostsThumbnails } from '../../../redux/actions/applicationActions';

// Components
import BasicHeaderView from '../view/basicHeaderView';

interface BackHeaderProps {
  backIconName: 'close' | 'arrow-back';
}

const BasicHeaderContainer = (props: BackHeaderProps) => {
  const dispatch = useAppDispatch();
  const isHideImages = useAppSelector((state) => state.application.hidePostsThumbnails);

  const _handleOnPressBackButton = () => {
    const { navigation, isNewPost, handleOnBackPress } = props;

    if (isNewPost) {
      navigation.navigate({
        routeName: ROUTES.SCREENS.FEED,
      });
    } else {
      navigation.goBack();
    }

    if (handleOnBackPress) {
      handleOnBackPress();
    }
  };

  const _handleViewModeToggle = () => {
    dispatch(setHidePostsThumbnails(!isHideImages));
  };

  return (
    <BasicHeaderView
      handleOnPressBackButton={_handleOnPressBackButton}
      handleViewModeToggle={_handleViewModeToggle}
      {...props}
    />
  );
};

export default withNavigation(BasicHeaderContainer);
