// ============================================================
//  FILE: navigation/MainStack.js
//  MỤC ĐÍCH: Stack điều hướng dành cho người ĐÃ đăng nhập
//
//  CẤU TRÚC:
//    MainStack
//      └── MainTabs (BottomTabNavigator)  ← màn hình mặc định
//            ├── HomeScreen               ← Tab 1
//            └── ProfileScreen            ← Tab 2 (có nút Sign Out)
//
//  KEY POINT: ProfileScreen dùng setIsLoggedIn(false) để đăng xuất
//  → App.js tự động switch về AuthStack, không cần navigate()
// ============================================================

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppContext } from '../context/AppContext';

// Tạo Stack Navigator cho Main (các màn hình đầy đủ)
const Stack = createNativeStackNavigator();

// Tạo Bottom Tab Navigator (thanh tab phía dưới màn hình)
const Tab = createBottomTabNavigator();


// ════════════════════════════════════════════════════════════
//  MÀN HÌNH 1: HomeScreen (Tab 1)
//  Màn hình trang chủ sau khi đăng nhập
//  Giữ nguyên từ code gốc của bạn
// ════════════════════════════════════════════════════════════
function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeText}>
        Đây là trang chủ của Nguyễn Đình Duy
      </Text>
      <Text style={{ fontSize: 14 }}>
        Sau khi đăng nhập bằng SĐT
      </Text>
    </View>
  );
}


// ════════════════════════════════════════════════════════════
//  MÀN HÌNH 2: ProfileScreen (Tab 2)
//  Hiển thị thông tin người dùng + nút Đăng xuất
//
//  CHỨC NĂNG ĐĂNG XUẤT:
//     Gọi setIsLoggedIn(false) → Context cập nhật
//     → RootNavigator re-render → AuthStack xuất hiện
//     → Tự động về màn hình Login mà không cần navigate()
// ════════════════════════════════════════════════════════════
function ProfileScreen() {

  // Lấy hàm setIsLoggedIn từ AppContext để thực hiện đăng xuất
  const { setIsLoggedIn } = useAppContext();

  // ── Hàm xử lý đăng xuất ─────────────────────────────────
  // Trong thực tế có thể thêm: xóa token, clear AsyncStorage,...
  const handleSignOut = () => {
    // Đặt isLoggedIn = false → app tự động chuyển về AuthStack
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.header}>Hồ sơ cá nhân</Text>

      {/* Hiển thị thông tin người dùng (demo) */}
      <Text style={styles.infoText}>👤 Nguyễn Đình Duy</Text>
      <Text style={styles.infoText}>📞 0901234567</Text>

      {/* Nút đăng xuất — màu đỏ để phân biệt với các nút khác */}
      <View style={styles.btnContainer}>
        <Button
          title="🚪 Đăng xuất"
          color="red"
          onPress={handleSignOut} // → setIsLoggedIn(false) → về AuthStack
        />
      </View>
    </View>
  );
}


// ════════════════════════════════════════════════════════════
//  BOTTOM TAB NAVIGATOR
//  Thanh điều hướng tab ở phía dưới màn hình
//  Gộp HomeScreen và ProfileScreen thành 2 tab
// ════════════════════════════════════════════════════════════
function MainTabs() {
  return (
    // Tab.Navigator: quản lý việc chuyển đổi giữa các tab
    <Tab.Navigator>

      {/* Tab 1: Trang chủ */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Trang chủ' }} // Tên hiển thị trên thanh tab
      />

      {/* Tab 2: Hồ sơ cá nhân */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Hồ sơ'}}
      />

    </Tab.Navigator>
  );
}


// ════════════════════════════════════════════════════════════
//  MAIN STACK NAVIGATOR
//  Stack bao ngoài cùng của phần đã đăng nhập
//  Màn hình đầu tiên luôn là MainTabs (Bottom Tab)
//  Có thể thêm các màn hình khác vào Stack này (Detail, Settings,...)
// ════════════════════════════════════════════════════════════
export default function MainStack() {
  return (
    <Stack.Navigator>

      {/* Màn hình chính: Bottom Tab Navigator
          headerShown: false → ẩn header của Stack
          vì Tab.Navigator đã có header riêng cho từng tab */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      {/* Có thể thêm các màn hình khác ở đây
          Ví dụ: màn hình chi tiết sản phẩm, cài đặt,... */}
      {/* <Stack.Screen name="ProductDetail" component={ProductDetailScreen} /> */}
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}

    </Stack.Navigator>
  );
}


// ── STYLES ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Trang chủ: nền màu cyan, căn giữa nội dung (giữ nguyên từ code gốc)
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
    padding: 20,
    paddingTop: 40,
    paddingBottom:60,
  },

  // Text lớn trên trang chủ
  homeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  // Container căn giữa dùng cho ProfileScreen
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
    marginBottom: 20,
    color: '#333',
  },

  // Text hiển thị thông tin người dùng
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },

  // Wrapper cho nút Đăng xuất
  btnContainer: {
    marginTop: 30,
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
