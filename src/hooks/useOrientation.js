import {useLayoutEffect} from 'react';
import {useState} from 'react';
import {Dimensions} from 'react-native';

const useOrientation = () => {
  const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));

  useLayoutEffect(() => {
    const onChange = result => {
      setScreenInfo(result.window);
    };

    Dimensions.addEventListener('change', onChange);
    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...screenInfo,
    portrait: screenInfo.height > screenInfo.width,
  };
};

export default useOrientation;
