import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator, Image, ListView } from 'react-native';
import { connect } from 'react-redux';
import { loadNewsRequest } from '../../../actions';
import NewItem from './NewItem';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadMore: false,
            sizeScroll: 0
        };
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
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(news);
    }

    renderRow(newItem) {
        const SERVER_URL = 'http://34.219.69.51';
        return <NewItem
            imageUrl={SERVER_URL + newItem.news_url_image}
            titleNew={newItem.news_title}
            dateNew={newItem.news_date}
            descNew={newItem.news_desc}
        />;
    }

    renderNews(newsObj) {
        if (this.dataSource) {
            return (
                <ListView
                    removeClippedSubviews={false}
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

    isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToBottom = 20;

        if (this.state.sizeScroll != contentSize.height - paddingToBottom) {
            this.setState({ sizeScroll: contentSize.height - paddingToBottom, loadMore: true });
        }

        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    loadMoreNews() {
        this.setState({ loadMore: false });
        this.props.loadNewsRequest(this.props.skip);
    }

    showLoaderMoreNews() {
        if (this.props.loading_more_news) {
            const { styleLoadMore, textLoadMore } = styles;
            return (
                <View style={styleLoadMore}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={textLoadMore}>Cargando mas noticias</Text>
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
        skip: state.home.skip,
        loading_more_news: state.home.loading_more_news,
        moreNews: state.home.moreNews
    };
};

export default connect(mapStateToProps, { loadNewsRequest })(News, { withRef: true });