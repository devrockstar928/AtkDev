import { ContentCreator } from '../atk/model/interface';
import * as faker from 'faker';
import { Injectable } from '@angular/core';





@Injectable()
export class ContentCreatorDb {

    creators: ContentCreator[] = [];

    constructor() {
        // this.openDb();
    }
    openDb() {
        const request = window.indexedDB.open('content-profile', 1);
        let db;
        const creator = this.getContentCreator();
        request.onerror = function (event) {
        };

        request.onsuccess = function (event) {
            db = request.result;
        };


        const getContentCreator = function (): ContentCreator {
            return {
                userID: faker.random.number(),
                profilePicture: faker.image.avatar(),
                fullName: faker.name.findName(),
                email: faker.internet.email(),
                level: faker.random.number(),
                xP: faker.random.number(),
                numOfTiers: faker.random.number(),
                numOfPosts: faker.random.number(),
            } as ContentCreator;
        };

        request.onupgradeneeded = function (event) {
            db = event.target['result'];
            const objectStore = db.createObjectStore('creators', { keyPath: 'id' });
            for (let index = 0; index < 100; index++) {
                objectStore.add(creator);
            }
        };

    }


    getContentCreator(): ContentCreator {
        return {
            userID: faker.random.number(),
            profilePicture: faker.image.avatar(),
            fullName: faker.name.findName(),
            email: faker.internet.email(),
            level: faker.random.number(100),
            xP: faker.random.number(),
            numOfTiers: faker.random.number(20),
            numOfPosts: faker.random.number(250),
        } as ContentCreator;
    }
}
