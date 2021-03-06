import React, { Component } from 'react';
import ActionSheet from 'react-native-actionsheet';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import {
    onLoadCareersCalc,
    getCoursesCarrer,
    requestCalc,
    clearArrayCosts,
    allFiledAreRequired
} from '../../actions';
import {
    View,
    Text,
    TouchableOpacity,
    Picker,
    ActivityIndicator,
    ScrollView,
    TextInput,
    Platform,
    Keyboard
} from 'react-native';
import {
    Table,
    TableWrapper,
    Rows,
    Col
} from 'react-native-table-component';
import Header from '../header/header';
import Menu from '../menu/menu';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            careerSelected: '',
            arrayCoursesSelected: [],
            checked: [],
            step: 1,
            email: '',
            name: '',
            tel: '',
            keyboardShow: false
        }
    }

    componentDidMount() {
        this.props.onLoadCareersCalc();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        this.setState({
            keyboardShow: true
        });
    }

    _keyboardDidHide() {
        this.setState({
            keyboardShow: false
        });
    }

    sendCareerSelected(itemValue) {
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
        if (Platform.OS === 'android') {
            return this.renderPickerForAndroid();
        } else if (Platform.OS === 'ios') {
            return this.renderPickerForIOS();
        }
    }

    renderToChange() {
        if (this.props.calculator.courses.length != 0 && this.state.careerSelected != 'default') {
            return (
                <Text style={{ color: '#3dc4ff' }}>Cambiar carrera</Text>
            );
        }
    }

    renderToChangeIOS() {
        let careerName;
        this.props.calculator.careersCalculator.map(function (item, index) {
            if (item.careers_id == this.state.careerSelected) {
                careerName = item.careers_title;
            }
        }.bind(this));

        if (this.props.calculator.courses.length != 0 && this.state.careerSelected != 'default') {
            return (
                <Text style={{ color: '#3dc4ff' }}>{careerName}</Text>
            );
        }
    }

    renderPickerForAndroid() {
        const {
            pickerCareerStyle,
            pickerCareerContainerStyle
        } = styles;

        return (
            <View style={{ marginBottom: 10, backgroundColor: '#3dc4ff' }}>
                <Picker
                    selectedValue={this.state.careerSelected}
                    style={{ height: 50, width: '100%', color: 'white' }}
                    onValueChange={this.sendCareerSelected.bind(this)}
                >
                    <Picker.Item key={'unselectable'} label={'Seleccione su carrera'} value={'default'} />
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

    renderPickerForIOS() {
        if (this.props.calculator.careersCalculator) {
            let { arrayTitles, arrayCareers, indexCancel } = this.returnArrayTitle();
            const { IOSPickerStyle, IOSPickerStyleText } = styles;
            if (arrayTitles.length != 0) {
                return (
                    <View>
                        {this.renderToChangeIOS()}
                        <View style={IOSPickerStyle}>
                            <Text style={IOSPickerStyleText} onPress={() => { this.ActionSheet.show() }}>Seleccione su carrera</Text>
                        </View>
                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            title={'Seleccione su carrera'}
                            options={arrayTitles}
                            cancelButtonIndex={indexCancel}
                            destructiveButtonIndex={indexCancel}
                            onPress={this.actionsSheetIOSonPress.bind(this, arrayCareers)}
                        />
                    </View>
                );
            }
        }
    }

    actionsSheetIOSonPress(array, index) {
        if (array[index]) {
            this.sendCareerSelected(array[index].value);
        }
    }

    returnArrayTitle() {
        let arrayTitles = [];
        let arrayCareers = [];
        let indexCancel;

        this.props.calculator.careersCalculator.map(function (item, index) {
            arrayTitles[index] = item.careers_title;

            arrayCareers[index] = {
                value: item.careers_id
            }

        }.bind(this));

        indexCancel = arrayTitles.length;
        arrayTitles[indexCancel] = JSON.stringify('Cancel');

        return { arrayTitles, arrayCareers, indexCancel };
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

    changeStep(step) {
        this.setState({
            step: step
        });
    }

    renderNextBtn() {
        const { btnNextStyle, textBtnNextStyle } = styles;
        if (this.state.arrayCoursesSelected.length != 0) {
            return (
                <TouchableOpacity onPress={this.changeStep.bind(this, 2)} style={btnNextStyle}>
                    <View onPress={this.changeStep.bind(this, 2)}>
                        <Text style={textBtnNextStyle}>Siguiente</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <View>
                </View>
            );
        }
    }

    renderCalculator() {
        if (this.state.step == 1) {
            const {
                mainContainerCalc,
                mainText,
                containerCalc,
                containerActivity,
                containerInfoStyle
            } = styles;
            if (this.props.calculator.careersCalculator.length != 0) {
                return (
                    <View style={mainContainerCalc}>
                        <Text style={mainText}>Calcule los costos de matricula para estudiantes de primer ingreso</Text>
                        <View style={containerCalc}>
                            {this.renderPickerCareer()}
                            {this.renderInfoCalculator()}
                            {this.renderNextBtn()}
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={containerActivity}>
                        <ActivityIndicator size="large" color="#3dc4ff" />
                    </View>
                );
            }
        } else if (this.state.step == 2) {
            return this.sendInformation();
        } else if (this.state.step == 3) {
            return this.sendInformationStep3();
        }
    }

    sendInformationStep3() {
        const {
            mainContainerCalc,
            btnNextStyle,
            btnNextCalcStyle,
            textBtnNextStyle,
            textInfoTable
        } = styles;
        if (this.props.calculator.costs) {
            const { valor_por_credito, creditos_seleccionados } = this.props.calculator.costs.credito;
            return (
                <View style={[mainContainerCalc]}>
                    <ScrollView style={{ flex: .94 }}>
                        <Text style={textInfoTable}>Creditos seleccionados: {creditos_seleccionados}</Text>
                        <Text style={textInfoTable}>Valor por credito: ₡{valor_por_credito}</Text>
                        {this.returnTableCash()}
                        {this.returnTableCredit()}
                    </ScrollView>
                    <View style={[btnNextStyle, { flex: .06, justifyContent: 'center' }]}>
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.changeStep.bind(this, 1)}>
                            <Text style={textBtnNextStyle}>Volver a seleccion de materias</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={mainContainerCalc}>
                    <ActivityIndicator size="large" color="#3dc4ff" />
                </View>
            );
        }
    }

    returnTableCredit() {
        const {
            total_a_pagar_mes,
            valor_por_credito,
            creditos_seleccionados,
            total_a_pagar, carne_total,
            costo_de_creditos,
            costo_de_creditos_descuento,
            costo_matricula,
            matricula_descuento
        } = this.props.calculator.costs.credito;

        tableData = [
            ['₡' + costo_de_creditos],
            ['₡' + costo_de_creditos_descuento],
            ['₡' + costo_matricula],
            ['₡' + matricula_descuento],
            ['₡' + carne_total],
            ['₡' + total_a_pagar],
            ['₡' + total_a_pagar_mes]
        ];

        tableTitle = ['Colegiatura', 'Descuento', 'Matrícula', 'Descuento 1er ingreso', 'Carnet anual', 'Total a pagar', 'Pago por mes'];

        const {
            title,
            wrapper,
            row,
            text,
            head,
            text1,
            tableContainer,
            tableTextTitle
        } = styles;
        return (
            <View style={tableContainer}>
                <View style={{ padding: 7, backgroundColor: '#3dc4ff' }}>
                    <Text style={tableTextTitle}>Pago a credito</Text>
                </View>
                <Table>
                    <TableWrapper style={wrapper}>
                        <Col data={tableTitle} style={title} heightArr={[40, 40]} textStyle={text} />
                        <Rows data={tableData} flexArr={[1]} style={row} textStyle={text1} />
                    </TableWrapper>
                </Table>
            </View>
        );
    }

    returnTableCash() {
        const {
            valor_por_credito,
            creditos_seleccionados,
            total_a_pagar, carne_total,
            costo_de_creditos,
            costo_de_creditos_descuento,
            costo_matricula,
            matricula_descuento
        } = this.props.calculator.costs.contado;

        tableTitle = ['Colegiatura', 'Descuento', 'Matrícula', 'Descuento 1er ingreso', 'Carnet anual', 'Total a pagar'];
        tableData = [
            ['₡' + costo_de_creditos],
            ['₡' + costo_de_creditos_descuento],
            ['₡' + costo_matricula],
            ['₡' + matricula_descuento],
            ['₡' + carne_total],
            ['₡' + total_a_pagar]
        ];
        const {
            title,
            wrapper,
            row,
            text,
            head,
            text1,
            tableContainer,
            tableTextTitle
        } = styles;
        return (
            <View style={tableContainer}>
                <View style={{ padding: 7, backgroundColor: '#3dc4ff' }}>
                    <Text style={tableTextTitle}>Pago de contado</Text>
                </View>
                <Table>
                    <TableWrapper style={wrapper}>
                        <Col data={tableTitle} style={title} heightArr={[40, 40]} textStyle={text} />
                        <Rows data={tableData} flexArr={[1]} style={row} textStyle={text1} />
                    </TableWrapper>
                </Table>
            </View>
        );
    }

    onInputNameChange(text) {
        this.setState({
            name: text
        });
    }

    onInputEmailChange(text) {
        this.setState({
            email: text
        });
    }

    onInputTelChange(text) {
        this.setState({
            tel: text
        });
    }

    returnValidInfoText() {
        if (this.props.calculator.fieldsRequired) {
            return (
                <View style={{ justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: 'red' }}>Todos los campos son requeridos</Text>
                </View>
            );
        }
    }

    sendInformation() {
        const {
            itemFormStyle,
            formCalc,
            mainContainerCalc,
            btnNextStyle,
            textBtnNextStyle,
            btnNextCalcStyle,
            titleForm,
            titleText
        } = styles;
        return (
            <View style={mainContainerCalc}>
                {this.returnValidInfoText()}
                <View style={titleForm}>
                    <Text style={titleText}>Ingrese la informacion solicitada para mostrar los costos de matricula.</Text>
                </View>
                <ScrollView style={formCalc}>
                    <View style={itemFormStyle}>
                        <TextInput
                            placeholder='Nombre Completo'
                            value={this.state.name}
                            onChangeText={text => this.onInputNameChange(text)}
                        />
                    </View>
                    <View style={itemFormStyle}>
                        <TextInput
                            placeholder='Correo'
                            value={this.state.email}
                            onChangeText={text => this.onInputEmailChange(text)}
                        />
                    </View>
                    <View style={itemFormStyle}>
                        <TextInput
                            placeholder='Telefono'
                            keyboardType='numeric'
                            maxLength={8}
                            value={this.state.tel}
                            onChangeText={text => this.onInputTelChange(text)}
                        />
                    </View>
                </ScrollView>
               {this.returnOptions()}
            </View>
        );
    }

    returnOptions() {
        const {
            btnNextStyle,
            textBtnNextStyle,
            btnNextCalcStyle,
        } = styles;
        if (!this.state.keyboardShow) {
            return (
                <View>
                    <TouchableOpacity onPress={this.changeStep.bind(this, 1)} style={[btnNextStyle, btnNextCalcStyle]}>
                        <Text style={textBtnNextStyle}>Volver a seleccion de materias</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressCalc.bind(this)} style={[btnNextStyle, btnNextCalcStyle]}>
                        <Text style={textBtnNextStyle}>Calcular</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View />
            );
        }
    }

    onPressCalc() {
        if (this.validateFields(this.state.name, this.state.email, this.state.tel)) {
            this.props.requestCalc(this.state.name, this.state.email, this.state.tel, this.state.arrayCoursesSelected);
            this.changeStep(3);
            this.props.clearArrayCosts();
            this.props.allFiledAreRequired(false);
        } else {
            this.props.allFiledAreRequired(true);
        }
    }

    validateFields(name, email, tel) {
        let validationArray = [];
        let valid = true;

        if (name.length == 0) {
            validationArray.push(false);
        } else if (email.length == 0) {
            validationArray.push(false);
        } else if (tel.length == 0) {
            validationArray.push(false);
        }

        for (x = 0; x < validationArray.length; x++) {
            if (validationArray[x] == false) {
                valid = false;
            }
        }

        return valid;

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
        position: 'relative',
        justifyContent: 'center',
    },
    mainText: {
        fontSize: 16,
        marginTop: 10,
        color: 'white',
        backgroundColor: 'rgba(61, 196, 255, 0.9)',
        textAlign: 'center'
    },
    containerCalc: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
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
    },
    formCalc: {
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: .5,
    },
    btnNextCalcStyle: {
        flex: .1,
        justifyContent: 'center',
        padding:20
    },
    titleForm: {
        flex: .3,
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 18,
        textAlign: 'center'
    },
    itemFormStyle: {
        marginTop: 10
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    wrapper: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        backgroundColor:
            'rgba(61, 196, 255, 0.9)',
    },
    row: {
        height: 40
    },
    text: {
        textAlign: 'center',
        color: 'white'
    },
    text1: {
        textAlign: 'center'
    },
    tableContainer: {
        padding: 15
    },
    tableTextTitle: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    textInfoTable: {
        marginTop: 15,
        marginLeft: 15,
        fontSize: 18
    },
    IOSPickerStyle: {
        backgroundColor: 'rgba(61, 196, 255, 0.9)',
        padding: 10
    },
    IOSPickerStyleText: {
        color: 'white'
    }
}

const mapStateToProps = ({ calculator }) => {
    return {
        calculator: calculator
    };
};

export default connect(mapStateToProps, {
    onLoadCareersCalc,
    getCoursesCarrer,
    requestCalc,
    clearArrayCosts,
    allFiledAreRequired
})(Calculator);