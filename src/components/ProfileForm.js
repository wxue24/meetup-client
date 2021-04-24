import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TextInput, Button, Modal } from "react-native";
import { styles } from "../styles/basicStyles";
import RadioButton from "radio-buttons-react-native";
import CheckBox from "react-native-check-box";
import RangeSlider from "rn-range-slider";
import ToggleBtn from "react-native-flip-toggle-button";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { interests_list } from "../utils/interests";
import Rail from "./range-slider/Rail";
import RailSelected from "./range-slider/RailSelected";
import Thumb from "./range-slider/Thumb";
import Label from "./range-slider/Label";
import Notch from "./range-slider/Notch";

const radioButtonGrades = [
  { label: 9 },
  { label: 10 },
  { label: 11 },
  { label: 12 },
];

const radioButtonSchool = [
  { label: "Only recommend from my school", data: "yes" },
  { label: "Do not recommend from my school", data: "no" },
  { label: "Recommend from any school", data: "any" },
];

const isEmpty = (string) => {
  return string.trim() === "";
};

const ProfileForm = ({ setProfile, navigate, generalErrors }) => {
  const [firstName, setFirstName] = useState("");
  const [grade, setGrade] = useState(0);
  const [school, setSchool] = useState("");
  const [interests, setInterests] = useState([]);
  const [filterSettings, setFilterSettings] = useState({
    minGrade: 9,
    maxGrade: 12,
  });
  const [notificationPreferences, setNotificationPreferences] = useState({
    newFriendRequest: true,
    newRecommendations: true,
  });
  const [errors, setErrors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Component states
  const [pickerInterestVal, setPickerInterestVal] = useState(
    interests.length ? interests[0].code : ""
  );
  const [pickerRadiusVal, setPickerRadiusVal] = useState(1);

  // Range slider for grade preference
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChanged = useCallback((low, high) => {
    setFilterSettings({
      ...filterSettings,
      minGrade: low,
      maxGrade: high,
    });
  }, []);

  // Gets error message for specific field
  const isError = (errorField) => {
    return errors.find((e) => e.field === errorField) ? true : false;
  };
  const getErrorMessage = (errorField) => {
    return errors.find((e) => e.field === errorField).message;
  };

  const validateData = () => {
    if (isEmpty(firstName)) {
      setErrors((errors) => [
        ...errors,
        {
          field: "firstName",
          message: "Name cannot be empty. Please enter a valid name",
        },
      ]);
    }
    if (isEmpty(school))
      setErrors((errors) => [
        ...errors,
        {
          field: "school",
          message: "School cannot be empty. Please enter a valid school name",
        },
      ]);
    if (grade == 0)
      setErrors((errors) => [
        ...errors,
        {
          field: "grade",
          message: "Please select your current grade",
        },
      ]);
    if (interests.length == 0)
      setErrors((errors) => [
        ...errors,
        {
          field: "interests",
          message: "Please select at least one interest",
        },
      ]);
    if (!filterSettings.sameSchool)
      setErrors((errors) => [
        ...errors,
        {
          field: "filterSettings",
          message: "Please select one of the below settings",
        },
      ]);
  };

  const handleSubmit = async () => {
    setFilterSettings({
      ...filterSettings,
      sharedInterest: pickerInterestVal,
      radius: pickerRadiusVal,
    });
    validateData();
    if (errors.length > 0) {
      return;
    }

    const publicData = {
      firstName,
      grade,
      school,
      interests,
    };
    const privateData = {
      filterSettings,
      notificationPreferences,
    };
    await setProfile(publicData, privateData);
    if (!generalErrors) navigate();
    else {
      let gErrors = [];
      for (const [key, value] of Object.entries(generalErrors)) {
        gErrors.push({ message: value });
      }
      setErrors(gErrors);
    }
  };

  useEffect(() => {
    if(errors.length > 0){
      setModalVisible(true)
    } else {
      setModalVisible(false)
    }
    // console.log(errors);
  }, [errors]);

  

  return (
    <ScrollView>
      <View>
        <Text>First Name or Nickname</Text>
        {isError("firstName") ? (
          <Text style={styles.errorMessage}>
            {getErrorMessage("firstName")}
          </Text>
        ) : null}
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Text>School</Text>
        {isError("school") ? (
          <Text style={styles.errorMessage}>{getErrorMessage("school")}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          value={school}
          onChangeText={setSchool}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Text>Grade</Text>
        {isError("grade") ? (
          <Text style={styles.errorMessage}>{getErrorMessage("grade")}</Text>
        ) : null}
        <RadioButton
          style={styles.input}
          data={radioButtonGrades}
          selectedBtn={(b) => setGrade(b.label)}
        />

        <Text>Interests</Text>
        {isError("interests") ? (
          <Text style={styles.errorMessage}>
            {getErrorMessage("interests")}
          </Text>
        ) : null}
        <View style={styles.input}>
          {interests_list.map((item) => {
            return (
              <View key={item.category}>
                <Text
                  style={{
                    alignSelf: "center",
                    marginBottom: 10,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "#2289dc",
                  }}
                >
                  {item.category}
                </Text>
                {item.data.map((interest) => (
                  <CheckBox
                    rightText={interest.name}
                    isChecked={interests.includes(interest)}
                    key={interest.name}
                    onClick={() => {
                      if (interests.includes(interest)) {
                        setInterests(interests.filter((i) => interest !== i));
                      } else {
                        setInterests([...interests, interest]);
                      }
                    }}
                  />
                ))}
              </View>
            );
          })}
        </View>

        <Text>Recommendation Preferences</Text>
        <View style={styles.input}>
          <Text>Grades</Text>
          <RangeSlider
            min={9}
            max={12}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChanged}
          />
        </View>

        <View style={styles.input}>
          <Text>School</Text>
          {isError("filterSettings") ? (
            <Text style={styles.errorMessage}>
              {getErrorMessage("filterSettings")}
            </Text>
          ) : null}
          <RadioButton
            data={radioButtonSchool}
            selectedBtn={(b) =>
              setFilterSettings({ ...filterSettings, sameSchool: b.data })
            }
          />
        </View>

        <View style={styles.input}>
          <Text>Radius of Search</Text>
          <Picker
            selectedValue={pickerRadiusVal}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              setPickerRadiusVal(itemValue);
            }}
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5+" value={0} />
          </Picker>
        </View>

        <View style={styles.input}>
          <Text>Shared Interest</Text>
          <Text>
            Have a specific interest in mind? Narrow your search by selecting
            it!
          </Text>
          <Picker
            selectedValue={pickerInterestVal}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => {
              setPickerInterestVal(itemValue);
            }}
          >
            {interests.map((item) => {
              return (
                <Picker.Item
                  label={item.name}
                  value={item.code}
                  key={item.code}
                />
              );
            })}
          </Picker>
        </View>

        <Text>Notification Preferences</Text>
        <View style={styles.input}>
          <Text>New friend requests</Text>
          <ToggleBtn
            value={notificationPreferences.newFriendRequest}
            buttonWidth={90}
            buttonHeight={25}
            buttonRadius={50}
            sliderRadius={50}
            onLabel={"On"}
            offLabel={"Off"}
            labelStyle={{ color: "white" }}
            onToggle={(newState) =>
              setNotificationPreferences({
                ...notificationPreferences,
                newFriendRequest: newState,
              })
            }
          />
          <Text>New friend recommendations</Text>
          <ToggleBtn
            value={notificationPreferences.newRecommendations}
            buttonWidth={90}
            buttonHeight={25}
            buttonRadius={50}
            sliderRadius={50}
            onLabel={"Daily"}
            offLabel={"Off"}
            labelStyle={{ color: "white" }}
            onToggle={(newState) =>
              setNotificationPreferences({
                ...notificationPreferences,
                newRecommendations: newState,
              })
            }
          />
        </View>

        <View style={styles.centeredView}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalErrorMessage}>
          {!generalErrors ? (
            <Text>
              Oops, look like there are some errors. Please go back and correct
              them
            </Text>
          ) : (
            <Text>
              Oops, looks like something went wrong. Please try again later
            </Text>
          )}
          <View>
            <Button title="OK" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileForm;
