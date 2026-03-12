// ============================================================
//  FILE: context/AppContext.js
//  MỤC ĐÍCH: Tạo "kho dữ liệu toàn cục" cho toàn bộ ứng dụng
//  Bất kỳ component nào cũng có thể đọc/ghi dữ liệu ở đây
//  mà không cần truyền props qua nhiều tầng (tránh prop drilling)
// ============================================================

import React, { createContext, useContext, useState } from 'react';

// ── BƯỚC 1: Tạo Context (cái "hộp" lưu dữ liệu toàn cục) ──
// createContext(null) → giá trị mặc định là null khi chưa có Provider bao ngoài
const AppContext = createContext(null);

// ── BƯỚC 2: Tạo Provider (cái "vỏ bọc" bao quanh toàn bộ app) ──
// children = tất cả các component con bên trong <AppProvider>...</AppProvider>
export const AppProvider = ({ children }) => {

  // isLoggedIn: biến trạng thái đăng nhập toàn cục
  //   - false → chưa đăng nhập → App hiển thị AuthStack
  //   - true  → đã đăng nhập  → App hiển thị MainStack
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // value = những gì muốn chia sẻ cho các component con
  // Bất kỳ component nào gọi useAppContext() đều nhận được { isLoggedIn, setIsLoggedIn }
  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

// ── BƯỚC 3: Tạo custom hook để dùng Context dễ hơn ──
// Thay vì gõ: const { isLoggedIn } = useContext(AppContext)
// Chỉ cần gõ: const { isLoggedIn } = useAppContext()
export const useAppContext = () => useContext(AppContext);
