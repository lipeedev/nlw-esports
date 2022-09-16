import { ActivityIndicator, View } from 'react-native';
import { Background } from '..';
import { THEME } from '../../theme';

import { styles } from './styles';

export function Loading() {
    return (
        <Background>
            <View style={styles.container}>
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
            </View>
        </Background>
    );
}