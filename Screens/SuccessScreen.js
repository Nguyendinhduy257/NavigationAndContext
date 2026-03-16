import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ChevronLeft, ArrowRight } from 'lucide-react-native';

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 1. NÚT BACK */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <ChevronLeft size={28} color="#6172F3" strokeWidth={2.5} />
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
    paddingTop: 60,
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