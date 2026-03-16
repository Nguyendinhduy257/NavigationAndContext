import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronLeft, Plus } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function ScanScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 1. ẢNH NỀN TOÀN MÀN HÌNH */}
      {/* Dùng một ảnh giả lập cho chai nước trái cây */}
      <Image 
        source={require('../assets/OrangeJuice.png')} 
        style={styles.backgroundImage} 
      />
      
      {/* Lớp phủ mờ nhẹ để các chi tiết màu trắng nổi bật hơn (Tuỳ chọn) */}
      <View style={styles.overlay} />

      {/* 2. NÚT BACK TÙY CHỈNH */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <ChevronLeft size={28} color="#4A90E2" strokeWidth={2.5} />
      </TouchableOpacity>

      {/* 3. KHUNG QUÉT (SCANNER FRAME) */}
      <View style={styles.scannerContainer}>
        {/* 4 góc của khung quét */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        {/* Hiệu ứng kính/vệt sáng ở giữa khung quét */}
        <View style={styles.scanLine} />
      </View>

      {/* 4. THẺ THÔNG TIN SẢN PHẨM Ở DƯỚI CÙNG */}
      <View style={styles.productCard}>
        <View style={styles.productThumbnailContainer}>
          <Image 
            source={require('../assets/OrangeJuice.png')} 
            style={styles.productThumbnail} 
          />
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.brandName}>Lauren's</Text>
          <Text style={styles.productName}>Orange Juice</Text>
        </View>

        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE2D5', // Màu nền dự phòng nếu ảnh không load
    justifyContent:'center',
    alignItems:'center',
  },
  backgroundImage: {
    width: width,
    height: height,
    position: 'absolute',
    resizeMode: 'cover',
    display:'flex',
    justifyContent:'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(235, 226, 213, 0.2)', // Phủ mờ một chút để giống màu be trong thiết kế
  },
  
  // --- Nút Back ---
  backButton: {
    position: 'absolute',
    top: 60, // Căn lề trên (né tai thỏ)
    left: 20,
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  // --- Khung quét Camera ---
  scannerContainer: {
    position: 'absolute',
    top: height * 0.22, // Đẩy khung quét xuống một chút
    alignSelf: 'center',
    width: 280,
    height: 380,
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  topLeft: {
    top: 0, left: 0,
    borderBottomWidth: 0, borderRightWidth: 0,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: 0, right: 0,
    borderBottomWidth: 0, borderLeftWidth: 0,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: 0, left: 0,
    borderTopWidth: 0, borderRightWidth: 0,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: 0, right: 0,
    borderTopWidth: 0, borderLeftWidth: 0,
    borderBottomRightRadius: 20,
  },
  scanLine: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Mảng mờ giống hiệu ứng quét
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignSelf: 'center',
  },

  // --- Thẻ Sản Phẩm (Nằm trên thanh Bottom Tab) ---
  productCard: {
    position: 'absolute',
    bottom: 120, // CHÚ Ý: Đặt 120 để chừa khoảng trống 90px cho Bottom Navigation
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  productThumbnailContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F0EBE1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productThumbnail: {
    width: 30,
    height: 45,
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  brandName: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#6172F3', // Màu xanh tím của nút
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});