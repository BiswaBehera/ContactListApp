import React, {Component} from 'react';
import { StyleSheet, Button, KeyboardAvoidingView, TextInput } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        minWidth: 100,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
    },
})

export default class AddContactForm extends Component {
    state = {
        name: '',
        phone: '',
        isFormValid: false,
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.name !== prevState.name || this.state.phone !== prevState.phone) {
            this.validateForm();
        }
    }

    handleNameChange = name => {
        this.setState({name})
    }
    handlePhoneChange = phone => {
        if(+phone >= 0 && phone.length <= 10) {
            this.setState({phone})
        }
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state);    
    }

    validateForm = () => {
        const names = this.state.name.trim().split(' ');
        if(+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3 && names.length >=2) {
            this.setState({isFormValid: true})
        } else {
            this.setState({isFormValid: false})
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={this.handleNameChange}
                    placeholder="Name"
                />
                <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    value={this.state.phone}
                    onChangeText={this.handlePhoneChange}
                    placeholder="Phone"
                />
                <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid}/>
            </KeyboardAvoidingView>
        )
    }
}
