import { Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Background, GameCard, GameCardProps, Heading } from '../../components';

import logoImg from '../../assets/logo-nlw-esports.png';

export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([]);

    const navigation = useNavigation();

    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('Game', { id, title, bannerUrl });
    }

    useEffect(() => {
        fetch('http://192.168.0.102:3333/games')
            .then(r => r.json())
            .then(data => setGames(data));
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />

                <Heading
                    title='Encontre seu duo!'
                    subtitle='Selecione o game que deseja jogar...'
                />

                <FlatList
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (<GameCard data={item} onPress={() => handleOpenGame(item)} />)}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentList}
                    horizontal
                />
            </SafeAreaView>
        </Background>
    );
}