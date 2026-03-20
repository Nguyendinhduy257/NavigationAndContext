import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ChevronLeft, ArrowRight, ChevronRight } from 'lucide-react-native';
import HomeScreen from './HomeScreen';

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 1. NÚT BACK */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={()=>navigation.goBack()}
        activeOpacity={0.7}
      >
        {/* icon của nút Back*/}
        <ChevronLeft size={28} color="#6172F3" strokeWidth={2.5} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.backHomeButton}
        onPress={()=>{
          navigation.popToTop();//đửa CartStack về lại CartScreen gốc
          navigation.navigate('Home')
        }}
        activeOpacity={0.7}
      >
        <Image
        source={require('../assets/HomeIcon.png')}
        style={styles.homeIcon}
        />
        <ChevronRight size={28} color='#6172F3' strokeWidth={2.5}></ChevronRight>
      </TouchableOpacity>

      {/* 2. NỘI DUNG CHÍNH */}
      <View style={styles.content}>
        {/* Ảnh minh họa - Thay bằng require('../assets/success_pos.png') nếu có ảnh trong máy */}
        <Image 
          source={ require('../assets/Group 167.png')} 
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Payment Success, Yayy!</Text>
        
        <Text style={styles.description}>
          we will send order details and invoice in{'\n'}your contact no. and registered email
        </Text>

        <TouchableOpacity style={styles.checkDetailsButton} activeOpacity={0.7}>
          <Text style={styles.checkDetailsText}>Check Details</Text>
          <ArrowRight size={20} color="#6172F3" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* 3. NÚT DOWNLOAD INVOICE Ở DƯỚI CÙNG */}
      <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
        <Text style={styles.downloadButtonText}>Download Invoice</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: '7%',
    paddingBottom: 40,
  },
  
  // Nút Back
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F8F9FB', // Màu xám rất nhạt
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    //nôi lên trên khỏi Stack của các Screen khác
    zIndex:10,
    //dành cho Android
    elevation:10,
  },
  backHomeButton: {
    // --- KHÓA CHÍNH ĐỂ NẰM CÙNG MỘT DÒNG ---
    flexDirection: 'row', // Chuyển từ xếp dọc (mặc định) sang xếp ngang
    alignItems: 'center', // Căn 2 icon thẳng hàng nhau theo chiều dọc
    justifyContent: 'center', // Căn 2 icon nằm giữa nút theo chiều ngang
    // ----------------------------------------

    // Tinh chỉnh lại kích thước cho gọn gàng (vừa đủ chứa 2 icon)
    // Bạn có thể giữ 100x100 nếu muốn, nhưng mình gợi ý kích thước này sẽ đẹp hơn:
    width: 80, // Chiều rộng rộng hơn một chút để chứa 2 icon
    height: 48, // Chiều cao bằng nút Back bên trái
    backgroundColor: '#F7F8FA', // Màu xám rất nhạt
    borderRadius: 14,
    
    // Nổi lên trên cùng
    zIndex: 10,
    elevation: 10, // Dành cho Android

    // --- SỬA LẠI CÁCH ĐẶT VỊ TRÍ ĐỂ NẰM GÓC TRÊN BÊN PHẢI ---
    // Thay vì dùng marginLeft/marginTop % rất khó căn, hãy dùng position absolute
    position: 'absolute',
    top: '5%', // Bằng với vị trí 'top' của nút Back bên trái
    right: 20, // Cách mép phải màn hình 20px (cân đối với nút Back bên trái cách mép 20px)
  },
  
  homeIcon: {
    width: 24,
    height: 24,
    marginRight: 6, // Tạo một khoảng cách nhỏ giữa ảnh Home và dấu mũi tên
    resizeMode: 'contain', // Đảm bảo ảnh không bị méo
    tintColor: '#6172F3', // Tô màu xanh cho ảnh Home khớp với màu dấu mũi tên (tuỳ chọn)
  },
  // Khối nội dung ở giữa
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50, // Đẩy lên một chút cho cân đối
  },
  illustration: {
    width: 220,
    height: 220,
    marginBottom: 40,
    opacity: 0.9, // Làm ảnh bớt gắt nếu dùng ảnh mạng
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  checkDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkDetailsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6172F3', // Màu xanh tím
    marginRight: 8,
  },

  // Nút Download
  downloadButton: {
    backgroundColor: '#6172F3', // Màu xanh tím
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#6172F3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});