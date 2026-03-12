// ============================================================
//  FILE: navigation/AuthStack.js
//  MỤC ĐÍCH: Stack điều hướng dành cho người CHƯA đăng nhập
//  Chứa các màn hình: Login, SignUp, ForgotPassword
//
//  CÁCH HOẠT ĐỘNG VỚI CONTEXT:
//    - Khi người dùng đăng nhập thành công (LoginScreen / SignUpScreen)
//      gọi setIsLoggedIn(true) → App.js tự động switch sang MainStack
//    - KHÔNG dùng navigation.replace() hay navigate() để chuyển stack
// ============================================================

import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  TextInput, Button, Alert, Platform
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppContext } from '../context/AppContext';

// Tạo đối tượng Stack Navigator dùng cho Auth
const Stack = createNativeStackNavigator();


// ════════════════════════════════════════════════════════════
//  MÀN HÌNH 1: LoginScreen
//  Cho phép người dùng nhập SĐT + mật khẩu để đăng nhập
// ════════════════════════════════════════════════════════════
function LoginScreen({ navigation }) {

  // Lấy hàm setIsLoggedIn từ AppContext
  // Dùng để báo cho toàn bộ app biết người dùng đã đăng nhập thành công
  const { setIsLoggedIn } = useAppContext();

  // State lưu giá trị input số điện thoại (re-render khi thay đổi)
  const [phone_number, setPhoneNumber] = useState('');

  // State lưu giá trị input mật khẩu (re-render khi thay đổi)
  const [password, setPassword] = useState('');

  // ── Hàm hiển thị thông báo ─────────────────────────────
  // Xử lý khác nhau cho Web và Mobile vì API khác nhau:
  //   - Web:    tạo div nổi rồi tự ẩn sau 3 giây
  //   - Mobile: dùng Alert.alert() có nút bấm
  // Params:
  //   tieuDe        → tiêu đề thông báo (vd: "Lỗi", "Thành công")
  //   noiDung       → nội dung chi tiết
  //   backgroundColor → màu nền (rỗng = đỏ mặc định)
  const hienThiThongBao = (tieuDe, noiDung, backgroundColor) => {
    if (Platform.OS === 'web') {
      // ── Hiển thị trên Web ──
      const color = backgroundColor || 'red'; // mặc định đỏ nếu không truyền màu

      // Tạo phần tử div để hiển thị thông báo dạng toast (nổi trên màn hình)
      const errorDiv = document.createElement('div');
      errorDiv.style.position = 'fixed';       // cố định vị trí, không cuộn theo trang
      errorDiv.style.top = '20px';             // cách đỉnh màn hình 20px
      errorDiv.style.left = '50%';             // căn giữa ngang
      errorDiv.style.transform = 'translateX(-50%)'; // điều chỉnh lại cho đúng tâm
      errorDiv.style.backgroundColor = color;
      errorDiv.style.color = 'white';
      errorDiv.style.padding = '10px 20px';
      errorDiv.style.borderRadius = '5px';
      errorDiv.style.zIndex = 9999;            // luôn hiển thị trên cùng
      errorDiv.textContent = `${tieuDe}: ${noiDung}`;

      document.body.appendChild(errorDiv);     // gắn vào trang

      // Tự động xóa div sau 3 giây (3000ms)
      setTimeout(() => document.body.removeChild(errorDiv), 3000);

    } else {
      // ── Hiển thị trên Mobile ──
      Alert.alert(tieuDe, noiDung);
    }
  };

  // ── Hàm xử lý khi người dùng bấm nút "Đăng nhập" ──────
  // Validate (kiểm tra) dữ liệu nhập vào trước khi cho đăng nhập
  const xuLyNhapLieu = () => {
    const phone = phone_number.trim(); // xóa khoảng trắng 2 đầu
    const pass = password.trim();

    // Kiểm tra 1: SĐT không được để trống
    if (!phone) {
      hienThiThongBao('Lỗi', 'Vui lòng nhập số điện thoại', '');
      return; // dừng hàm, không chạy tiếp
    }

    // Kiểm tra 2: SĐT phải đủ 10 chữ số
    if (phone.length < 10) {
      hienThiThongBao('Lỗi', 'Số điện thoại không hợp lệ (cần ít nhất 10 chữ số)', '');
      return;
    }

    // Kiểm tra 3: SĐT Việt Nam phải bắt đầu bằng 0
    if (!phone.startsWith('0')) {
      hienThiThongBao('Lỗi', 'Số điện thoại phải bắt đầu bằng số 0', '');
      return;
    }

    // Kiểm tra 4: Mật khẩu không được để trống
    if (!pass) {
      hienThiThongBao('Lỗi', 'Vui lòng nhập mật khẩu', '');
      return;
    }

    // Kiểm tra 5: Mật khẩu phải ít nhất 6 ký tự
    if (pass.length < 6) {
      hienThiThongBao('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự', '');
      return;
    }

    // ── Nếu qua hết tất cả các bước kiểm tra ──
    hienThiThongBao('Thành công', 'Đăng nhập thành công', 'green');

    //    KEY POINT: Gọi setIsLoggedIn(true) thay vì navigation.replace("Home")
    //    → Context cập nhật isLoggedIn = true
    //    → RootNavigator trong App.js tự động re-render
    //    → MainStack được hiển thị (không cần navigate thủ công)
    setIsLoggedIn(true);
  };

  return (
    // ScrollView: cho phép cuộn nội dung khi bàn phím hiện lên che màn hình
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Đăng nhập</Text>

        {/* Input số điện thoại */}
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone_number}
          onChangeText={(text) => {
            // Lọc chỉ giữ lại chữ số, xóa tất cả ký tự khác
            // Regex [^0-9] = "không phải chữ số" → thay bằng '' (rỗng)
            const numericText = text.replace(/[^0-9]/g, '');
            setPhoneNumber(numericText);
          }}
          keyboardType="numeric" // Hiển thị bàn phím số trên mobile
        />

        {/* Input mật khẩu */}
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true} // Ẩn ký tự thành dấu chấm (●●●●)
          value={password}
          onChangeText={setPassword}
        />

        {/* Nút đăng nhập → gọi hàm xuLyNhapLieu */}
        <View style={styles.btnContainer}>
          <Button title="Đăng nhập" onPress={xuLyNhapLieu} />
        </View>

        {/* Điều hướng sang SignUpScreen (vẫn trong AuthStack) */}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Chưa có tài khoản? Đăng ký
        </Text>

        {/* Điều hướng sang ForgotPasswordScreen (vẫn trong AuthStack) */}
        <Text style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>
          Quên mật khẩu?
        </Text>
      </View>
    </ScrollView>
  );
}


// ════════════════════════════════════════════════════════════
//  MÀN HÌNH 2: SignUpScreen
//  Cho phép người dùng tạo tài khoản mới
//  Sau khi đăng ký thành công → cũng setIsLoggedIn(true)
// ════════════════════════════════════════════════════════════
function SignUpScreen({ navigation }) {

  // Tương tự LoginScreen, cũng cần setIsLoggedIn để tự động vào app sau đăng ký
  const { setIsLoggedIn } = useAppContext();

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.header}>Đăng ký</Text>

      {/* Giả lập đăng ký thành công → setIsLoggedIn(true) → vào MainStack */}
      <Button
        title="Đăng ký thành công → vào App"
        onPress={() => setIsLoggedIn(true)}
      />

      {/* Quay về LoginScreen bằng goBack() */}
      <Text style={styles.link} onPress={() => navigation.goBack()}>
        Đã có tài khoản? Đăng nhập
      </Text>
    </View>
  );
}


// ════════════════════════════════════════════════════════════
//  MÀN HÌNH 3: ForgotPasswordScreen
//  Cho phép người dùng lấy lại mật khẩu qua SĐT
// ════════════════════════════════════════════════════════════
function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.header}>Quên mật khẩu</Text>
      <Text style={{ marginBottom: 20, color: '#555' }}>
        Nhập SĐT để lấy lại mật khẩu
      </Text>

      {/* goBack(): quay về màn hình trước đó trong stack (LoginScreen) */}
      <Button title="Quay lại" onPress={() => navigation.goBack()} />
    </View>
  );
}


// ════════════════════════════════════════════════════════════
//  AUTH STACK NAVIGATOR
//  Gộp 3 màn hình trên vào 1 Stack duy nhất
//  initialRouteName="Login" → màn hình đầu tiên luôn là Login
// ════════════════════════════════════════════════════════════
export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">

      {/* Màn hình Login: ẩn header vì có design riêng */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* Màn hình SignUp: hiển thị header với nút Back tự động */}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Đăng ký' }}
      />

      {/* Màn hình ForgotPassword: hiển thị header với nút Back tự động */}
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Quên mật khẩu' }}
      />

    </Stack.Navigator>
  );
}


// ── STYLES ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Container chính bao toàn bộ trang
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },

  // Căn nội dung ScrollView vào giữa màn hình
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },

  // Container đơn giản cho SignUp và ForgotPassword
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Tiêu đề màn hình
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },

  // Ô nhập liệu (TextInput)
  input: {
    width: '100%',
    maxWidth: 400,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },

  // Wrapper cho nút Button (để bo góc)
  btnContainer: {
    width: '100%',
    maxWidth: 400,
    marginTop: 10,
    borderRadius: 25,
    overflow: 'hidden', // clip bo góc cho Button
  },

  // Card bao quanh form (hộp trắng có bóng)
  formContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#e0f7fa',  // màu xanh nhạt
    padding: 20,
    borderRadius: 20,

    // Đổ bóng (iOS & Web)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 10, // Đổ bóng Android

    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text dạng link (màu xanh, gạch chân)
  link: {
    marginTop: 15,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
