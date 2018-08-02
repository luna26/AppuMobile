import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { onLoadCareersCalc, getCoursesCarrer } from '../../actions';
import Header from '../header/header';
import Menu from '../menu/menu';
import CheckBox from 'react-native-check-box'

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            careerSelected: '',
            arrayCoursesSelected: [],
            checked: []
        }
    }

    componentDidMount() {
        this.props.onLoadCareersCalc();
    }

    sendCareerSelected(itemValue, itemIndex) {
        this.setState({
            careerSelected: itemValue
        });

        this.setState((state) => {
            state.checked = [];
        });

        this.setState(prevState => ({
            arrayCoursesSelected: []
        }))

        this.props.getCoursesCarrer(itemValue);
    }

    renderPickerCareer() {
        const { pickerCareerStyle, pickerCareerContainerStyle } = styles;
        return (
            <View style={pickerCareerContainerStyle}>
                <Picker
                    selectedValue={this.state.careerSelected}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={this.sendCareerSelected.bind(this)}>
                    <Picker.Item key={'unselectable'} label={'Selecione su carrera'} value={'default'} />
                    {
                        this.props.calculator.careersCalculator.map(function (item, index) {
                            return (
                                <Picker.Item label={item.careers_title} value={item.careers_id} key={index} />
                            )
                        }.bind(this))
                    }
                </Picker>
            </View>
        );
    }

    checkboxCoursesChange(data, index) {

        let value = this.state.arrayCoursesSelected.indexOf(data);

        if (value == -1) {
            this.setState((state) => {
                state.checked[index] = true;
            });

            this.setState(prevState => ({
                arrayCoursesSelected: [...prevState.arrayCoursesSelected, data]
            }))
        } else {
            let array = [...this.state.arrayCoursesSelected]; // make a separate copy of the array

            array.splice(value, 1);
            this.setState({ arrayCoursesSelected: array });
            this.setState((state) => {
                state.checked[index] = false;
            });
        }
    }

    isChecked(index) {
        if (this.state.checked[index]) {
            return true;
        } else {
            return false;
        }
    }

    renderInfoCalculator() {
        if (this.props.calculator.courses.length != 0 && this.state.careerSelected != 'default') {
            const { contentCheckBox } = styles;
            return (
                <ScrollView style={{ flex: 1 }}>
                    {
                        this.props.calculator.courses.map(function (item, index) {
                            return (
                                <View style={contentCheckBox} key={index}>
                                    <Text>{item.day_name}</Text>
                                    <Text>{item.schedule_info}</Text>
                                    <Text>{item.course_code}</Text>
                                    <CheckBox
                                        style={{ flex: 1, padding: 10 }}
                                        onClick={() => this.checkboxCoursesChange(item.course_code, index)}
                                        isChecked={this.isChecked(index)}
                                        leftText={item.course_name}
                                    />
                                </View>
                            )
                        }.bind(this))
                    }
                </ScrollView>
            );
        }
    }

    renderNextBtn() {
        const { btnNextStyle, textBtnNextStyle } = styles;
        return (
            <View style={btnNextStyle}>
                <TouchableOpacity>
                    <Text style={textBtnNextStyle}>Siguiente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderCalculator() {
        const { mainContainerCalc, mainText, containerCalc, containerActivity, containerInfoStyle } = styles;
        if (this.props.calculator.careersCalculator.length != 0) {
            return (
                <View style={mainContainerCalc}>
                    <Text style={mainText}>Calculadora para estudiantes de primer ingreso</Text>
                    <View style={containerCalc}>
                        {this.renderPickerCareer()}
                    </View>
                    <View style={containerInfoStyle}>
                        {this.renderInfoCalculator()}
                    </View>
                    {this.renderNextBtn()}
                </View>
            );
        } else {
            return (
                <View style={containerActivity}>
                    <ActivityIndicator size="large" color="#3dc4ff" />
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                {this.renderCalculator()}
                <Menu indexSelected={this.props.indexSelected} />
            </View>
        );
    }
}

const styles = {
    mainContainerCalc: {
        backgroundColor: 'white',
        flex: 1,
    },
    mainText: {
        fontSize: 18,
        marginTop: 10,
        alignSelf: 'center',
    },
    containerCalc: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(61, 196, 255, 0.9)',
        padding: 5,
        borderRadius: 10,
        flex: .15
    },
    containerActivity: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    containerInfoStyle: {
        flex: .85,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(61, 196, 255, 0.9)',
        padding: 5,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    contentCheckBox: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(61, 196, 255, 0.9)',
    },
    btnNextStyle: {
        backgroundColor: 'rgba(61, 196, 255, 0.9)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
    },
    textBtnNextStyle: {
        color: 'white',
        alignSelf: 'center',
    }
}

const mapStateToProps = ({ calculator }) => {
    return {
        calculator: calculator
    };
};

export default connect(mapStateToProps, { onLoadCareersCalc, getCoursesCarrer })(Calculator);