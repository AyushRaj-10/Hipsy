import React, { useRef, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import { updateProfile } from "../../api/user.api";
import { uploadProfileImage } from "../../api/upload.api";
import { AuthContext } from "../../context/AuthContext";
import { AppTheme } from "../../theme";

const GENDER_OPTIONS = ["MALE", "FEMALE", "OTHER"];
const FITNESS_OPTIONS = ["WEIGHT_LOSS", "MUSCLE_GAIN", "GENERAL_FITNESS", "ENDURANCE"];

const formatLabel = (value) =>
  value
    ? value
        .toString()
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "Not set";

export default function EditProfileScreen({ route, navigation }) {
  const { user } = route.params;
  const { setUser } = React.useContext(AuthContext);
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [age, setAge] = useState(user.age ? String(user.age) : "");
  const [gender, setGender] = useState(user.gender || "");
  const [fitnessGoal, setFitnessGoal] = useState(user.fitnessGoal || "");
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleWebUpload = async (event) => {
    const file = event?.target?.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);
      const uploaded = await uploadProfileImage(file);
      setProfileImage(uploaded.profileImage || "");
      Alert.alert("Image uploaded", "Your profile photo was updated.");
    } catch (err) {
      Alert.alert("Upload failed", err?.response?.data?.message || "Please try again.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const save = async () => {
    try {
      setLoading(true);
      const updated = await updateProfile({
        name,
        phone,
        age: age ? Number(age) : undefined,
        gender: gender || undefined,
        fitnessGoal: fitnessGoal || undefined,
        profileImage: profileImage || user.profileImage,
      });
      setUser(updated);
      Alert.alert("Profile updated", "Your changes were saved.");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Unable to save", err?.response?.data?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.heading}>Edit profile</Text>
          <Text style={styles.subtitle}>
            Keep your account details current so the backend profile stays in sync everywhere.
          </Text>

          <View style={styles.avatarSection}>
            <ProfileAvatar image={profileImage || user.profileImage} name={name || user.name} size={104} />
            <View style={styles.avatarCopy}>
              <Text style={styles.avatarTitle}>Profile image</Text>
              <Text style={styles.avatarText}>
                Use a direct image URL or upload a file on web.
              </Text>
            </View>
          </View>

          <Input label="Name" value={name} onChangeText={setName} />
          <Input label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Input label="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
          <Input
            label="Profile image URL"
            value={profileImage}
            onChangeText={setProfileImage}
            placeholder="https://..."
          />

          <View style={styles.optionGroup}>
            <Text style={styles.groupLabel}>Gender</Text>
            <View style={styles.optionRow}>
              {GENDER_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setGender(option)}
                  style={[styles.optionChip, gender === option && styles.optionChipActive]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      gender === option && styles.optionTextActive,
                    ]}
                  >
                    {formatLabel(option)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.optionGroup}>
            <Text style={styles.groupLabel}>Fitness goal</Text>
            <View style={styles.optionRow}>
              {FITNESS_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setFitnessGoal(option)}
                  style={[styles.optionChip, fitnessGoal === option && styles.optionChipActive]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      fitnessGoal === option && styles.optionTextActive,
                    ]}
                  >
                    {formatLabel(option)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {Platform.OS === "web" ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleWebUpload}
              />
              <Button
                title={uploading ? "Uploading..." : "Upload image file"}
                variant="secondary"
                onPress={() => fileInputRef.current?.click()}
                loading={uploading}
              />
            </>
          ) : null}

          <Button title="Save changes" onPress={save} loading={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: AppTheme.spacing.lg,
    paddingBottom: AppTheme.spacing.xxl,
  },
  card: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 30,
    padding: AppTheme.spacing.lg,
    gap: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
  heading: {
    fontSize: 26,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: AppTheme.colors.textMuted,
  },
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 24,
    backgroundColor: AppTheme.colors.surfaceSoft,
  },
  avatarCopy: {
    flex: 1,
    gap: 6,
  },
  avatarTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  avatarText: {
    fontSize: 13,
    lineHeight: 19,
    color: AppTheme.colors.textMuted,
  },
  optionGroup: {
    gap: 10,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: AppTheme.colors.text,
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: AppTheme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  optionChipActive: {
    backgroundColor: AppTheme.colors.primary,
    borderColor: AppTheme.colors.primary,
  },
  optionText: {
    fontSize: 12,
    fontWeight: "800",
    color: AppTheme.colors.textMuted,
  },
  optionTextActive: {
    color: "#fff",
  },
});
