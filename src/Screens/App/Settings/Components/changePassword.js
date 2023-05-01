import React, { useState, useContext, useEffect, useRef } from "react";
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";

import { UserContext } from "../../../../api/firebase";
import { ThemeContext } from "../../../../components/theme";
import { LocaleContext } from "../../../../components/locale";
import {
  Container,
  Heading,
  Body,
  Main,
  Form,
  View,
  Input,
  TextInput,
  H0,
  H1,
  H3,
  H3Bold,
  P,
  TxtButton,
  TextAlert,
  TextValid,
  Profile,
  Picture,
  ProfilePicture,
  Infor,
  TextError,
  ButtonPrimary,
  FooterSmall,
} from "../../../../components/styles";

const ChangePassword = ({ navigation }) => {
  const { locale } = useContext(LocaleContext);
  const { user, updateUserPassword } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const currentPasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
  const [photo, setPhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [currentPasswordValid, setCurrentPasswordValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordStrong, setPasswordStrong] = useState(null);
  const [rePasswordValid, setRePasswordValid] = useState(null);

  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPassword, setErrorPassword] = useState("errorPassword");

  const currentPasswordValidate = (text) => {
    setCurrentPassword(text);
  };

  const passwordValidate = (text) => {
    if (text !== "") {
      const regV = /^(?=.*[a-z])(?=.*[0-9]).{6,22}$/;
      setPasswordValid(regV.test(text));
      const regS = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{6,22}$/;
      setPasswordStrong(regS.test(text));
      setPassword(text ? text : "");
    }
  };
  const rePasswordValidate = (text) => {
    if (passwordValid == true && text !== "") {
      const reg = text === password ? text : rePassword;
      setRePasswordValid(text === password ? true : false);
      setRePassword(reg);
    }
  };

  const confirmation = () => {
    return Alert.alert(
      locale.alert.password_change.title,
      locale.alert.password_change.message,
      [
        {
          text: locale.alert.ok,
          onPress: async () => {
            try {
              navigation.navigate('Loading');
            } catch (error) {
              Alert.alert(error.message)
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleChange = async () => {
    try {
      await updateUserPassword(currentPassword, rePassword);
      confirmation();
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/missing-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_missing_password);
        setCurrentPasswordValid(false);
      } else if (error.code === "auth/wrong-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_wrong_password);
        setCurrentPasswordValid(false);
      } else {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_connect_user);
        setCurrentPasswordValid(currentPasswordValid == true ? true : false);
        setPasswordValid(passwordValid == true ? true : false);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const name = user?.email.split("@")[0];
      setPhoto(user?.photoURL);
      setUserName(user?.displayName ? user?.displayName : name);
    });

    return unsubscribe;
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container behavior="height">
        <Heading style={{ marginTop: 40, marginBottom: 10 }}>
          <H0 style={{ marginBottom: 5 }}>{locale.password_config.title}</H0>
          <P>{locale.password_config.subtitle}</P>
        </Heading>
        <Body>
          <Main>
            <Profile
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginLeft: "6%",
              }}
            >
              <Picture>
                <ProfilePicture style={{ width: 80, height: 80 }}>
                  <UserAvatar
                    size={72}
                    style={{ width: 72, height: 72, borderRadius: 100 }}
                    name={userName}
                    src={photo}
                  />
                </ProfilePicture>
              </Picture>
              <Infor
                style={{
                  width: "auto",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: 15,
                  marginBottom: 15,
                }}
              >
                <H3Bold>{userName}</H3Bold>
                <H3>{user?.email}</H3>
              </Infor>
            </Profile>
            <Form style={{flex: 1, marginTop: 40, alignSelf: 'center'}}>
            <Input
                style={{
                  ...styles.shadow,
                  borderWidth: 0.1,
                  marginBottom: 15,
                  backgroundColor: `${
                    currentPasswordValid == false ? theme.inputError : theme.backgroundSecondary
                  }`,
                }}
              >
                <TextInput
                  ref={currentPasswordRef}
                  placeholder={locale.password_config.current_password}
                  placeholderTextColor={theme.placeholder}
                  selectionColor={theme.primary}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={currentPasswordValidate}
                  onSubmitEditing={() => passwordRef.current.focus()}
                />
              </Input>
              <Input
                style={{
                  ...styles.shadow,
                  borderWidth: 0.1,
                  marginBottom: 10,
                  backgroundColor: `${
                    error === errorPassword && passwordValid == false
                      ? theme.inputError
                      : theme.backgroundSecondary
                  }`,
                }}
              >
                <TextInput
                  ref={passwordRef}
                  placeholder={locale.password_config.password}
                  placeholderTextColor={theme.placeholder}
                  selectionColor={theme.primary}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  secureTextEntry={true}
                  returnKeyType="next"
                  onChangeText={passwordValidate}
                  onSubmitEditing={() => rePasswordRef.current.focus()}
                />
                {passwordStrong == false && passwordValid == true ? (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="alert-circle-outline"
                    size={20}
                    color={theme.primary}
                  />
                ) : passwordValid == false && password !== "" ? (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="alert-circle-outline"
                    size={20}
                    color={theme.error}
                  />
                ) : passwordStrong == true && password !== "" ? (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="checkmark-circle-outline"
                    size={20}
                    color={theme.secondary}
                  />
                ) : (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="alert-circle-outline"
                    size={20}
                    color={theme.transparent}
                  />
                )}
              </Input>
              {passwordStrong == false && passwordValid == true ? (
                <TextAlert>Password medium</TextAlert>
              ) : passwordValid == false && password !== "" ? (
                <TextError>Password weak</TextError>
              ) : passwordStrong == true && password !== "" ? (
                <TextValid>Password strong</TextValid>
              ) : (
                <TextError></TextError>
              )}
              <Input
                style={{
                  ...styles.shadow,
                  borderWidth: 0.1,
                  marginBottom: 10,
                  backgroundColor: `${
                    error === errorPassword && rePasswordValid == false
                      ? theme.inputError
                      : theme.backgroundSecondary
                  }`,
                }}
              >
                <TextInput
                  ref={rePasswordRef}
                  placeholder={locale.password_config.confirm_password}
                  placeholderTextColor={theme.placeholder}
                  selectionColor={theme.primary}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={rePasswordValidate}
                  onSubmitEditing={handleChange}
                />
                {rePasswordValid == false && rePassword !== "" ? (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="alert-circle-outline"
                    size={20}
                    color={theme.error}
                  />
                ) : (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="alert-circle-outline"
                    size={20}
                    color={theme.transparent}
                  />
                )}
                {rePasswordValid == true && rePassword !== "" ? (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="checkmark-circle-outline"
                    size={20}
                    color={theme.secondary}
                  />
                ) : null}
              </Input>
              {error ? (
                <TextError>{errorMsg}</TextError>
              ) : (
                <TextError></TextError>
              )}
              <ButtonPrimary
                style={styles.shadow}
                onPress={handleChange}
                accessibilityLabel={locale.password_config.change_button.accessibility}
              >
                <TxtButton>{locale.password_config.change_button.text}</TxtButton>
              </ButtonPrimary>
            </Form>
          </Main>
          <FooterSmall>
            <View style={{ marginTop: 10 }}>
              <H1>{locale.global.app.name}</H1>
            </View>
          </FooterSmall>
        </Body>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});

ChangePassword.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ChangePassword;
