import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, Pressable } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { initDB, getAllWaterLogs, deleteWaterLog } from '@/utils/database';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogsList from '@/app/components/LogsList';
import { useWaterLog } from '@/contexts/WaterLogContext';

interface WaterLog {
  id: number;
  date: string;
  time: string;
}

interface SectionData {
  title: string;
  data: WaterLog[];
}

const formatLogsIntoSections = (logs: { id: number; date: string }[]): SectionData[] => {
  const formattedLogs = logs.map(log => {
    const dateObj = new Date(log.date);

    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return {
      id: log.id,
      date: formattedDate,
      time: formattedTime,
    };
  });

  const grouped: Record<string, WaterLog[]> = {};
  formattedLogs.forEach(log => {
    if (!grouped[log.date]) grouped[log.date] = [];
    grouped[log.date].push(log);
  });

  return Object.entries(grouped).map(([title, data]) => ({ title, data }));
};

export default function LogsScreen() {
  const db = useSQLiteContext();
  const { refreshKey } = useWaterLog();

  const [sections, setSections] = useState<SectionData[]>([]);
  const [visible, setVisible] = useState(false);
  const [deleteText, setDeleteText] = useState('delete');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB(db);
        setInitialized(true);
      } catch (err) {
        console.error('DB init failed:', err);
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const rawLogs = await getAllWaterLogs(db) as { id: number; date: string }[];
        const sections = formatLogsIntoSections(rawLogs);
        setSections(sections);
      } catch (err) {
        console.error('Error loading logs:', err);
      }
    };
  
    loadLogs();
  }, [db, refreshKey]);
  

  const handleDeleteToggle = () => {
    setVisible(prev => !prev);
    setDeleteText(prev => (prev === 'delete' ? 'hide' : 'delete'));
  };

  const handleDeleteLog = async (id: number) => {
    try {
      await deleteWaterLog(db, id);
      const rawLogs = await getAllWaterLogs(db) as { id: number; date: string }[];
      const updatedSections = formatLogsIntoSections(rawLogs);
      setSections(updatedSections);
    } catch (err) {
      console.error('Error deleting log:', err);
    }
  };
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Hydration Logs</Text>
        <View style={styles.headerContainer}>
          <Text style={styles.subtitle}>Your water intake history</Text>
        </View>
      </View>

      <View style={styles.logsContainer}>
        {sections.length > 0 && (
          <Pressable onPress={handleDeleteToggle} style={styles.deleteButton}>
            <Text style={styles.deleteText}>{deleteText}</Text>
          </Pressable>
        )}

        {sections.length > 0 ? (
          <SectionList
            style={styles.section}
            sections={sections}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <LogsList item={item} visible={visible} onPress={() => handleDeleteLog(item.id)} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No water logs found</Text>
            <Text style={styles.emptySubtext}>Your hydration history will appear here</Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#5498FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    color: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: hp('0.5%'),
    justifyContent: 'space-between',
  },
  logsContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('1%'),
    backgroundColor: '#e6f2ff',
  },
  listContent: {
    paddingBottom: hp('3%'),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp('15%'),
  },
  emptyText: {
    fontSize: hp('2.5%'),
    color: '#2c3e50',
    fontFamily: 'Inter-SemiBold',
    marginBottom: hp('1%'),
  },
  emptySubtext: {
    fontSize: hp('1.8%'),
    color: '#7f8c8d',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    paddingHorizontal: wp('10%'),
  },
  section: {
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    fontSize: hp('2%'),
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    backgroundColor: '#5498FF',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('3%'),
    marginTop: hp('1.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  deleteButton: {
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#5498FF',
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'flex-end',
  },
  deleteText: {
    color: '#fff',
    fontSize: hp('1.6%'),
    fontFamily: 'Inter-Medium',
  },
});
