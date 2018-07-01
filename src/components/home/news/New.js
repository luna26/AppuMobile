import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { loadNewsRequest } from '../../../actions';
import NewItem from './NewItem';
import Header from '../../header/header';

class News extends Component {
    componentDidMount() {
        this.props.loadNewsRequest();
        this.props.passRefUpward(this.refs);
    }

    renderNews(newsObj) {
        const { containerActivity } = styles;
        const SERVER_URL = 'http://34.219.69.51';
        if (newsObj) {
            return newsObj.map(function (newItem, x) {
                return <NewItem key={x} imageUrl={SERVER_URL+newItem.news_url_image} titleNew={newItem.news_title} dateNew={newItem.news_date} descNew={newItem.news_desc} />
            });
        } else {
            return (
                <View style={containerActivity}>
                    <ActivityIndicator size="large" color="#3dc4ff" />
                </View>
            );
        }
    }

    render() {
        const { contianerNewsStyle, arrowUpStyle } = styles;
        const { news } = this.props;
        return (
            <ScrollView showsVerticalScrollIndicator={false} ref='_scrollViewNews'>
                <Header />
                <View style={contianerNewsStyle}>
                    {this.renderNews(this.props.news)}
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    contianerNewsStyle: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'white',
    },
    containerActivity: {
        flex: 1
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.home.news
    };
};

export default connect(mapStateToProps, { loadNewsRequest })(News, { withRef: true });