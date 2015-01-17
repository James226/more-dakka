/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />

interface Window {
    marked: any;
}

module MoreDakka {
    export enum TopicType {
        Standard = 1,
        Pin = 50,
        Announcement = 100
    }

    export class Board {
        Id: string;
        Name: string;
    }

    export class Topic {
        Id: string;
        Name: string;
    }

    export class BoardViewModel {
        id: string;
        name: string;
        totalTopics: number;
        lastTopicId: string;
        lastTopicTitle: string;
        lastPostAuthor: string;
    }

    export class ForumViewModel {
        id: string;
        title: string;
        topicType: TopicType;
        totalPosts: number;
        lastPost: Date;
        isRead: boolean;

        constructor(id: string, title: string, topicType: TopicType, totalPosts: number, lastPost: string, isRead: boolean) {
            this.id = id;
            this.title = title;
            this.topicType = topicType;
            this.totalPosts = totalPosts;
            this.lastPost = new Date(Date.parse(lastPost));
            this.isRead = isRead;
        }
    }

    export class Post {
        TopicId: string;
        Body: string;
    }

    export class TopicViewModel {
        id: string;
        username: string;
        gravatarHash: string;
        authorPosts: number;
        body: string;
        postedAt: Date;
        editable: boolean;
        editing: boolean;
        pendingAction: boolean;

        constructor(id: string, username: string, gravatarHash: string, authorPosts: number, body: string, postedAt: string, editable: boolean) {
            this.id = id;
            this.username = username;
            this.gravatarHash = gravatarHash;
            this.authorPosts = authorPosts;
            this.body = body;
            this.postedAt = new Date(Date.parse(postedAt));
            this.editable = editable;
            this.editing = false;
            this.pendingAction = false;
        }
    }

    export class ForumService {
        boards: BoardViewModel[];
        boardPromise: ng.IPromise<BoardViewModel[]>;

        constructor(private $http: ng.IHttpService, private historyService: HistoryService, private textMarkupService: TextMarkupService) {

        }

        getBoards() {
            if (this.boardPromise == null) {
                this.boardPromise = this.$http
                    .get<BoardViewModel[]>('api/forum/board')
                    .then(data => this.boards = data.data)
                    .then(() => this.boards);
            }
            return this.boardPromise;
        }

        getTopics(boardId: string) {
            return this.$http
                .get<any[]>('api/forum/topic/' + boardId)
                .then(data => {
                    var posts: ForumViewModel[] = [];
                    for (var i in data.data) {
                        var record = data.data[i];
                        posts.push(new ForumViewModel(record.id, record.title, record.topicType, record.totalPosts, record.lastPost, this.historyService.isRead(record.lastPost)));
                    }
                    return posts;
                });
        }

        getPosts(topicId: string) {
            return this.$http
                .get<any[]>('api/forum/post/' + topicId)
                .then(data => {
                    var posts: TopicViewModel[] = [];
                    for (var i in data.data) {
                        var record = data.data[i];
                        this.historyService.markRead(record.postedAt);
                        posts.push(new TopicViewModel(
                            record.id,
                            record.username,
                            record.gravatarHash,
                            record.authorPosts,
                            record.body,
                            record.postedAt,
                            record.editable));
                    }
                    return posts;
                });
        }

        createTopic(boardId: string, title: string, body: string) {
            return this.$http
                .post<any>('api/forum/topic', { BoardId: boardId, Title: title, Body: body })
                .then(data => data.data);
        }

        createPost(topicId: string, body: string) {
            return this.$http
                .post<any>('api/forum/post', { TopicId: topicId, Body: body })
                .then(data => data.data);
        }

        editPost(id: string, body: string) {
            return this.$http
                .put<any>('api/forum/post/' + id, { Body: body })
                .then(data => data.data);
        }
    }
    moreDakka.service('forumService', ['$http', 'historyService', 'textMarkupService', ForumService]);
}