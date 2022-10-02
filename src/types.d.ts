declare namespace Types {
    interface Tag {
        _id: string;
        visibility: boolean;
        entityType: string;
        name: string;
        totalItems: number;
        items?: any[];
        meta: {
            slot: number;
            experiment: string;
        };
        deleted?: boolean;
        userId?: string;
        createdAt?: string;
        updated?: string;
        __v?: string;
        id?: string;
        
    }

    interface Meme {
        deleted: boolean;
        _id: string;
        name: string;
        originalURL: string;
        topText: string;
        bottomText: string;
        topTextColor: string;
        bottomTextColor: string;
        type: string;
        createdBy: string;
        createdAt: string;
        setId: string;
        updated: string;
        __v: number;
        finalURL: string;
    }

    interface Filter {
        "grade_type.aggs"?: string[];
        occupation?: string[];
        cloned?: boolean[];
        "subject.aggs"?: string[];
        "lang.aggs"?: string[];
        isProfane: boolean[];
        type: string[];
        createdBy: string[];
    }

    interface Quiz {
        isTagged: boolean;
        isLoved: boolean;
        stats: Stats;
        love: number;
        cloned: boolean;
        parentDetail: ParentDetail | null;
        deleted: boolean;
        draftVersion: number | null;
        publishedVersion: string | null;
        type: string;
        _id: string;
        info: Info;
        createdBy: User;
        createdAt: string;
        updated: string | null;
        hasPublishedVersion: boolean;
        hasDraftVersion: boolean;
        paidOrganization?: string;
        tagIds: string[];
    }

    interface ParentDetail {
        quizId: string;
        userId: string;
    }
    
    interface Room {
        assignmentTitle: string | null;
        assignments: null; // TODO
        canvas: {
            host: boolean;
            player: boolean;
        };
        code: string;
        collectionId: string | null;
        courseId: string | null;
        createGroup: null; // TODO
        createdAt: number;
        deleted: boolean;
        duration: number;
        endedAt: number /* I think its a number */ | null;
        experiment: string;
        expiry: number;
        gameTranslation: null; // TODO
        groupIds: any[]; // TODO
        groupsInfo: GroupsInfo;
        hash: string;
        host?: {
            serverId: string;
            socketId: string;
        };
        hostId: string;
        hostOccupation: string;
        hostSessionId: string;
        isShared: boolean;
        metadata: {}; // TODO
        name?: string;
        options: Options;
        organization: string;
        organizationIds: string[];
        players?: Player[];
        questions: string[] | Question[]; // Room from checkRoom vs Room from ws
        questionIds?: string[];
        reopenable: boolean;
        reopened: boolean;
        replayOf: null; // TODO
        responseLink: string;
        simGame: boolean;
        soloApis: null; // TODO
        startedAt: null; // TODO
        state: string;
        subscription: {
            adsFree: boolean;
            branding: boolean;
            gcl: boolean;
            playerLimit: number;
            trailEndAt: null; // WONTFIX
        };
        totalAnswerableQuestions: number;
        totalCorrect: number;
        totalMarks: number;
        totalPlayers: number;
        totalPossibleMarks: number;
        totalQuestions: number;
        traits: Traits;
        type: string;
        unitId: string | null; //TODO; I assume string
        version: Version[];
        versionId: string;
    }
    
    interface Player {
        appVersion?: null; // TODO
        attempts: string[];
        isAllowed: boolean;
        loginRequired: boolean;
        assignment?: null; // TODO
        createdAt?: number;
        currentStreak?: number;
        deleted?: boolean;
        experiment?: string;
        first?: boolean;
        id?: string;
        isOver?: boolean;
        isUnderage?: boolean;
        lastPlayedAt?: number;
        locale?: string;
        maximumStreak?: number;
        metadata?: {
            model: string;
            os: MetadataProperty;
            type: string;
            ua: MetadataProperty;
        };
        mongoId?: string | null;
        monsterId?: number;
        name?: string;
        origin?: string;
        playerMetadata?: {}; // TODO
        powerupEffects?: {}; // TODO
        powerups?: []; // TODO
        questions?: null; // TODO
        slot?: string;
        source?: string;
        startedAt?: number;
        totalAttempt?: number;
        totalCorrect?: number;
        totalResponses?: number;
        uid?: string;
        userAddons?: null; // TODO
        playerId?: string;
    }
    
    interface MetadataProperty {
        family: string;
        version: string;
    }
    
    interface Version {
        type: string;
        version: number;
    }
    
    interface GroupsInfo {
        assigned: any[]; // TODO
        assignedTo: {}; // TODO
        create: {}; // TODO
        data: {
            title: string | null; // I think string
            description: string | null; // I think string
        };
        gcl: any[]; // TODO
        grading: {
            isGraded: boolean;
            maxPoints: number;
        };
        hasGCL: boolean;
        mode: string;
    }
    
    interface Stats {
        played: number;
        totalPlayers: number;
        totalCorrect: number;
        totalQuestions: number;
    }
    
    interface User {
        local: cbLocal;
        google: cbGoogle;
        schoology?: cbSchoology;
        student: string | null;
        deactivated: boolean;
        deleted: boolean;
        _id: string;
        firstName: string;
        lastName: string;
        media: string;
        occupation: string;
        country: string;
        id: string;
        title?: string;
        paidOrganizatioon?: string;
        organizationIds?: string[];
        subject_tags?: string[];
        grades?: number[];
        courses?: Course[];
        organization?: Organization;
        lms?: {
            gcl: null; // TODO
            canvas: null; //
            edmodo: null; //
            schoology: null; //
            msTeams: null; //
        }
        isSuperUser?: boolean;
        tags?: Tag[];
    }

    interface Tag {
        _id: string;
        visibility: boolean;
        entityType: string;
        name: string;
        totalItems: number;
    }

    interface Organization {
        isCurated: boolean;
        placeId: null; // TODO
        _id: string;
        name: string;
        __v: number;
        organizationType: string;
        createdAt: string;
        id: string;
    }
    
    interface Course {
        displayName: string;
        internalName: string;
        _id: string;
        uniqueName: string;
    }

    interface cbGoogle {
        createdAt: string;
        profileId: string;
        email: string;
        displayName: string;
        firstName: string;
        lastName: string;
        image: string;
    }
    
    interface cbLocal {
        username: string;
        casedUsername: string;
    }

    interface cbSchoology {
        email: string;
        firtName: string;
        lastName: string;
        paidOrganization: string;
        profileId: string;
    }
    
    interface Traits {
        isQuizWithoutCorrectAnswer: boolean;
        totalSlides: number;
        extraLifeQuestionTypes?: string[];
    }
    
    interface Info {
        _id: string;
        traits: Traits;
        pref: {
            time: number | null;
        };
        lang: string;
        visibility: boolean;
        questions: Question[];
        subjects: string[];
        topics: string[];
        subtopics: string[];
        grade: string[];
        gradeLevel: number | null;
        deleted: boolean;
        standards: string[];
        name: string;
        createdAt: string;
        updated: string;
        qm: {
            [key: string]: {
                time: number;
            };
        };
        image: string;
        profane: boolean;
        isProfane: boolean;
        whitelisted: boolean;
        cached: boolean;
        courses: string[];
        theme: Theme;
    }
    
    interface Structure {
        kind: string;
        query: QuestionContent;
        explain: QuestionContent;
        options: QuestionContent[];
        answer?: number | number[] | string; // TODO: Verify
        settings: {
            hasCorrectAnswer: boolean;
            fibDataType: string;
            canSubmitCustomResponse: boolean;
        };
        marks: {
            correct: number;
            incorrect: number;
        };
        theme: Theme;
    }

    interface Theme {
        fontColor: {
            text: string;
        };
        background: {
            color: string;
            image: string;
            video: string;
        };
        shape: {
            largeShapeColor: string;
            smallShapeColor: string;
        };
        titleFontFamily: string;
        fontFamily: string;
    }
    
    interface QuestionContent {
        type: string;
        media: Media[];
        text: string[]|string; // TODO: Verify that this can be both string[] and string
        hasMath: boolean;
        math: {
            latex: string[];
            template: string; // TODO: Something goes here
        }
    }

    interface Media {
        type: string;
        video: string;
        url: string;
        meta: {
            width?: number;
            height?: number;
            layout?: string;
            text?: string;
            bgColor?: string;
            videoId?: string;
            start?: number;
            end?: number;
            duration?: number;
            kind?: string;
            embeddable?: boolean;
            title?: string;
            lat?: number; // I think
            long?: number; // I think
            heading?: string; // I think
            pitch?: number; // I think
            // There may be more meta undocumented
        };
    }
    
    interface Question {
        _id: string;
        createdAt: string;
        updated: string;
        time: number;
        type: string;
        published: boolean;
        structure: Structure;
        standards: string[];
        topics: string[];
        cached: boolean;
    }
    
    interface Options {
        adaptive: boolean;
        extraLife: string;
        groupIds: string[] | null; // TODO. I assume string
        jumble: boolean;
        jumbleAnswers: boolean;
        limitAttempts: number;
        loginRequired: boolean;
        memes: boolean;
        memeset: string;
        nicknameGenerator: boolean;
        powerups: string;
        questionsPerAttempt: number;
        redemption: string;
        showAnswers: boolean;
        showAnswers_2: string;
        studentLeaderboard: boolean;
        studentLiveReactions: boolean;
        studentMusic: boolean;
        studentQuizReview: boolean;
        studentQuizReview_2: string;
        timer: boolean;
        time_3: string;
    }
    
    interface PowerUp {
    
    }
    
    interface Response {
    
    }
    
    namespace Events {
        interface Disconnect {
            code: number;
            reason: Buffer;
        }
    
        interface Question {
            question: QuestionContent;
            answers: QuestionContent[];
            incorrectAnswers: any[];
            type: string;
        }
    
        interface Powerup {
            name: string;
            visibleOptions?: number[];
            streakChangeBy?: number;
        }
    
        interface Answer {
            streak: Player; // This is technically a player object, but the only two things shown are currentStreak and maximumStreak
            isCorrect: boolean;
            attempt: number;
            score: number;
            leaderboard: Leaderboard[];
        }
    }
    
    interface Leaderboard {
        name: string;
        rank: number;
        score: number;
    }
    
    interface GameOptions {
        correctPoints: number;
        incorrectPoints: number;
        time: number;
        streakBoost: number;
    }
}