import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {
  COCO_BOLD,
  PURPLE_COLOR,
  PURPLE_SECONDARY_COLOR,
} from '../../assets/styles';
import {LayoutContext} from '../../context/LayoutContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Filter = ({items = [], showFilter, setShowFilter, onValueChange}) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const {orientation, isMobile} = useContext(LayoutContext);

  useEffect(() => {
    setFilteredItems(
      items.filter(({label}) =>
        label.toUpperCase().includes(query.toUpperCase()),
      ),
    );
  }, [query]);

  const selectItem = item => {
    onValueChange(item.value);
    setShowFilter(false);
  };

  return (
    <Overlay
      style={styles.overlay}
      visible={showFilter}
      onBackdropPress={() => setShowFilter(false)}>
      <View style={{...styles.filterContainer, width: orientation.width}}>
        <View style={styles.filterSearchContainer}>
          <TextInput
            placeholderTextColor={PURPLE_COLOR}
            autoCorrect={true}
            autoCapitalize={'none'}
            keyboardType={'default'}
            secureTextEntry={false}
            placeholder={'Buscar...'}
            onChange={text => {
              setQuery(text.nativeEvent.text);
            }}
            value={query}
            style={{
              ...styles.filterSearch,
              fontSize: orientation.width * (isMobile ? 0.05 : 0.035),
            }}
          />
          <TouchableOpacity onPress={() => setShowFilter(false)}>
            <Icon
              style={{marginTop: 10}}
              name="times"
              size={30}
              color={PURPLE_COLOR}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            ...styles.filterList,
            paddingHorizontal: orientation.width * 0.03,
          }}>
          {filteredItems.map((item, index) => (
            <TouchableOpacity
              onPress={() => selectItem(item)}
              key={item.value + index}>
              <Text
                style={{
                  ...styles.filterItem,
                  fontSize: orientation.width * (isMobile ? 0.035 : 0.02),
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Overlay>
  );
};

export default Filter;

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  filterContainer: {
    height: '100%',
  },
  filterSearchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  filterSearch: {
    fontFamily: COCO_BOLD,
    color: PURPLE_COLOR,
    borderBottomColor: PURPLE_COLOR,
    borderBottomWidth: 5,
    width: '90%',
  },
  filterList: {
    width: '100%',
    display: 'flex',
  },
  filterItem: {
    fontFamily: COCO_BOLD,
    color: PURPLE_SECONDARY_COLOR,
    marginVertical: 5,
  },
});
