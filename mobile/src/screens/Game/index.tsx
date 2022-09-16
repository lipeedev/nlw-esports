import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameParams } from '../../@types/navigation';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Background, DuoCard, DuoCardProps, Heading, DuoMatch } from '../../components';


export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState('');

    const route = useRoute();
    const game = route.params as GameParams;

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    async function getDiscord1Username(adsId: string) {
        const { discord } = await fetch(`http://192.168.0.102:3333/ads/${adsId}/discord`)
            .then(r => r.json());

        setDiscordDuoSelected(discord);
    }

    useEffect(() => {
        fetch(`http://192.168.0.102:3333/games/${game.id}/ads`)
            .then(r => r.json())
            .then(data => setDuos(data));
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo} />

                    <View style={styles.right} />

                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode='cover'
                />

                <Heading
                    title={game.title}
                    subtitle='Conecte-se e comece a jogar!'
                />

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (<DuoCard data={item} onConnect={() => getDiscord1Username(item.id)} />)}
                    horizontal
                    contentContainerStyle={styles.contentList}
                    showsHorizontalScrollIndicator={false}
                    style={styles.containerList}
                />

                <DuoMatch
                    onClose={() => setDiscordDuoSelected('')}
                    visible={discordDuoSelected.length > 0}
                    discord={discordDuoSelected}
                />
            </SafeAreaView>
        </Background>

    );
}