import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

// 1. Import các Icon từ lucide
import { Scan, AlertTriangle, CheckCircle2, Calendar, ArrowRight } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
  const insights = [
    {
      id: 1,
      title: 'Scan new',
      subtitle: 'Scanned 483',
      icon: Scan, // 2. Truyền thẳng Component thay vì string
      iconColor: '#7B61FF',
      iconBg: '#F0EBFF',
      screen: 'ScanScreen',
    },
    {
      id: 2,
      title: 'Counterfeits',
      subtitle: 'Counterfeited 32',
      icon: AlertTriangle,
      iconColor: '#FF7A00',
      iconBg: '#FFEFE5',
    },
    {
      id: 3,
      title: 'Success',
      subtitle: 'Checkouts 8',
      icon: CheckCircle2,
      iconColor: '#00C48C',
      iconBg: '#E5F9F4',
    },
    {
      id: 4,
      title: 'Directory',
      subtitle: 'History 26',
      icon: Calendar,
      iconColor: '#33A0FF',
      iconBg: '#EAF4FF',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      {/* HEADER (Giữ nguyên) */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.subGreeting}>Nguyễn Đình Duy</Text>
        </View>
        <Image source={require('../assets/NguyenDinhDuy.png')} style={styles.avatar} />
      </View>

      {/* YOUR INSIGHTS */}
      <Text style={styles.sectionTitle}>Your Insights</Text>
      <View style={styles.insightsContainer}>
        {insights.map((item) => {
          const IconComponent = item.icon; // Lấy Component ra từ biến
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                {/* 3. Render Icon của Lucide */}
                <IconComponent size={28} color={item.iconColor} strokeWidth={2} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* EXPLORE MORE */}
      <View style={styles.exploreHeader}>
        <Text style={styles.sectionTitle}>Explore More</Text>
        <TouchableOpacity>
          {/* Thay icon mũi tên bằng Lucide */}
          <ArrowRight size={24} color="#000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Explore Scroll (Giữ nguyên) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploreScroll}>
        <View style={styles.exploreItem}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200' }} style={styles.exploreImage} />
        </View>
        <View style={styles.exploreItem}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200' }} style={styles.exploreImage} />
        </View>
      </ScrollView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60, // Căn lề trên cho thanh trạng thái (tai thỏ)
  },
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 15, // Bo góc giống avatar trong hình
  },

  // --- Section Styles ---
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 15,
  },

  // --- Insights Cards Styles ---
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    width: '48%', // Chia đôi màn hình, chừa ra 1 chút khoảng trống ở giữa
    backgroundColor: '#F8F9FB', // Màu nền xám/xanh siêu nhạt
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center', // Căn giữa nội dung trong thẻ
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20, // Bo góc cho nền của icon
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#999999',
  },

  // --- Explore More Styles ---
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exploreScroll: {
    flexDirection: 'row',
  },
  exploreItem: {
    marginRight: 15,
  },
  exploreImage: {
    width: 140,
    height: 180,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
});