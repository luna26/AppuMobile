import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    Image,
    ListView,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { loadNewsRequest } from '../../../actions';
import NewItem from './NewItem';
import { SERVER_DIR } from '../../../Config';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoaderMoreNews: false
        }
    }
    componentDidMount() {
        if (this.props.news.length == 0) {
            this.props.loadNewsRequest(this.props.skip);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ news }) {
        this.setState({
            showLoaderMoreNews: false
        });
        
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(news);
    }

    renderRow(newItem) {
        const SERVER_URL = SERVER_DIR;
        return (
            <NewItem
                imageUrl={SERVER_URL + newItem.news_url_image}
                titleNew={newItem.news_title}
                dateNew={newItem.news_date}
                descNew={newItem.news_desc}
            />
        );
    }

    removeClippedSubviews() {
        if (Platform.OS === 'android') {
            return true;
        } else if (Platform.OS === 'ios') {
            return false;
        }
    }

    renderNews(newsObj) {
        if (this.dataSource) {
            return (
                <ListView
                    removeClippedSubviews={this.removeClippedSubviews()}
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    onEndReached={this.loadMoreNews.bind(this)}
                />
            );
        } else {
            const { containerActivity } = styles;
            return (
                <View style={containerActivity}>
                    <ActivityIndicator size="large" color="#3dc4ff" />
                </View>
            );
        }
    }

    loadMoreNews() {
        this.props.loadNewsRequest(this.props.skip);
        this.setState({
            showLoaderMoreNews: true
        });
    }

    showLoaderMore() {
        const { containerActivity } = styles;
        if (this.state.showLoaderMoreNews) {
            return (
                <View style={{bottom: 0 }}>
                    <ActivityIndicator size="small" color="#3dc4ff" />
                </View>
            );
        }
    }

    render() {
        const { contianerNewsStyle, arrowUpStyle } = styles;
        const { news } = this.props;
        return (
            <View style={{ position: 'relative', marginLeft: 8, marginRight: 8, flex: 1 }}>
                {this.renderNews(this.props.news)}
                {this.showLoaderMore()}
            </View>
        );
    }
}

const styles = {
    contianerNewsStyle: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        position: 'relative',
    },
    containerActivity: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    styleLoadMore: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#3dc4ff',
        zIndex: 1000,
        paddingBottom: 5,
        paddingTop: 5,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10
    },
    textLoadMore: {
        textAlign: 'center',
        color: 'white',
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.home.news,
        skip: state.home.skip
    };
};

export default connect(mapStateToProps, { loadNewsRequest })(News, { withRef: true });