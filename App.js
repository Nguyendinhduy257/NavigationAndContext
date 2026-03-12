// ============================================================
//  FILE: App.js
//  MỤC ĐÍCH: File gốc của ứng dụng — nơi khởi động toàn bộ app
//
//  LUỒNG HOẠT ĐỘNG:
//    1. AppProvider bọc ngoài cùng → cung cấp isLoggedIn cho mọi nơi
//    2. NavigationContainer bọc navigation → bắt buộc của React Navigation
//    3. RootNavigator đọc isLoggedIn → quyết định hiển thị stack nào
//
//  KẾT QUẢ:
//    isLoggedIn = false → AuthStack  (Login / SignUp / ForgotPassword)
//    isLoggedIn = true  → MainStack  (Home Tab / Profile Tab / ...)
// ============================================================

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider, useAppContext } from './context/AppContext';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';

// ── RootNavigator ────────────────────────────────────────────
// Component trung gian: đọc trạng thái isLoggedIn từ Context
// rồi quyết định render AuthStack hay MainStack
//
//    Tại sao tách RootNavigator ra khỏi App()?
//    Vì useAppContext() chỉ dùng được BÊN TRONG <AppProvider>
//    Nếu gọi useAppContext() trực tiếp trong App() sẽ bị lỗi
//    vì lúc đó AppProvider chưa bao bọc bên ngoài
function RootNavigator() {
  // Lấy isLoggedIn từ AppContext (kho dữ liệu toàn cục)
  const { isLoggedIn } = useAppContext();

  // Toán tử 3 ngôi: nếu đã đăng nhập → MainStack, ngược lại → AuthStack
  // Khi isLoggedIn thay đổi, React tự động re-render và switch stack
  // → KHÔNG cần gọi navigation.navigate() để chuyển stack
  return isLoggedIn ? <MainStack /> : <AuthStack />;
}

// ── App (Component gốc) ──────────────────────────────────────
// Đây là component được xuất ra và chạy đầu tiên khi mở app
export default function App() {
  return (
    // AppProvider: bọc ngoài cùng → mọi component con đều truy cập được Context
    <AppProvider>

      {/* NavigationContainer: bắt buộc phải có khi dùng React Navigation
          Nó theo dõi trạng thái điều hướng của toàn bộ app */}
      <NavigationContainer>

        {/* RootNavigator: đọc isLoggedIn và render đúng stack */}
        <RootNavigator />

      </NavigationContainer>
    </AppProvider>
  );
}

// ── SƠ ĐỒ CẤU TRÚC ──────────────────────────────────────────
//
//  <AppProvider>                    ← Cung cấp isLoggedIn toàn cục
//    <NavigationContainer>          ← Quản lý navigation
//      <RootNavigator>              ← Đọc isLoggedIn
//        isLoggedIn=false → <AuthStack>
//          ├── LoginScreen          ← setIsLoggedIn(true) khi login
//          ├── SignUpScreen         ← setIsLoggedIn(true) khi đăng ký
//          └── ForgotPasswordScreen
//        isLoggedIn=true → <MainStack>
//          └── <BottomTabNavigator>
//                ├── HomeScreen
//                └── ProfileScreen  ← setIsLoggedIn(false) khi logout
