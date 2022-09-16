import { Modal, ModalProps, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from "phosphor-react-native";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "..";

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    return (
        <Modal {...rest} transparent statusBarTranslucent animationType="fade">
            <View style={styles.container}>

                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons
                            name="close" size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold' />

                    <Heading
                        style={{ alignItems: 'center', marginTop: 24 }}
                        title="Let's Play!"
                        subtitle="Agora é só começar a jogar"
                    />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>


                    <TouchableOpacity style={styles.discordButton}>
                        <Text style={styles.discord}>{discord}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
}