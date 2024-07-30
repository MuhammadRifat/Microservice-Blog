"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const service_common_1 = require("../../common/services/service.common");
const blog_schema_1 = require("./schema/blog.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BlogService = class BlogService extends service_common_1.Service {
    constructor(blogModel) {
        super(blogModel);
        this.blogModel = blogModel;
    }
    async create(user, createBlogDto) {
        createBlogDto.authorId = user.id;
        createBlogDto.author = {
            id: user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`,
            image: user.image || null
        };
        return await this.createOne(createBlogDto);
    }
    async bulkCreate() {
        const blogs = [];
        for (let i = 100000; i < 300000; i++) {
            blogs.push({
                title: `${i} Core Concepts of ES6`,
                content: `Functions:
        Default Parameter Values:
        Example:
        
        
        In this example, getStudentData() function contains three parameters where age is default parameter. If age does not pass when calling getStudentData() function, It has a working default for age value 17.
        
        Working with un-named parameters:
        Example:
        
        
        In this code example, add() function has two-parameter. Each function has an arguments array that contains all passing parameters of a function. So, If any function has two parameters but doesn’t worry about its calling with three parameters, because the arguments array captured all values and we can get exact results with un-named parameters.
        
        Spread Operator: (three dots)
        It used for copying an array.
        Concatenation or combining an array.
        Combining objects.
        Example:
        
        
        Arrow Function:
        It gets shorter. It defines => symbol.
        Example:
        
        
        try…catch:
        1. First, the code inside of try{} is executed.
        2. If no error occurs, then catch (err) is ignored and skip catch.
        3. if an error occurs, then stopped try{} execution and catch has executed.
        
        try…catch only works for runtime execution, it does not work for compile-time execution. This only works to avoid unwanted mistakes when there are no errors in the program.
        
        try…catch works synchronously. Because asynchronous javascript like
        
        setTimeout(function() {
        noSuchVariable; // script will die here
        }, 1000);
        
        It does not handle Call Stack, Call Stack’s Assistant Web Api handles it and sends it to CallBack Queue. After all, the execution of the call stack is finished, it comes inside the call stack in the reference of Event Loop, after which it shows the output.
        
        catch(error), the error is an object. It has two main properties:
        1. name. (returns Error name)
        2. message. (returns Textual Error message)
        
        Execution Context:
        
        When the Interpreter / Javascript Engine converts the code written in our language into machine language, it divides our code into pieces to reduce the complexity of interpretation. This is called the Execution context.
        
        Types of Execution Context:
        1. Global Execution Context.
        2. Function Execution Context.
        
        Global Execution Context:
        1. Creates a global object.
        2. Creates an object named this.
        3. Make space in memory for functions and variables.
        4. Sets the value of variables undefined.
        
        
        Function Execution Context:
        1. Creates a parameter/arguments object.
        2. Creates an object named this.
        3. Make space in memory for functions and variables.
        4. Sets the value of variables undefined.
        
        
        Reference Video: https://www.youtube.com/watch?v=Wk0-6b1W_VQ&t=0s
        
        Event Loop:
        Event Loop connects between Call Stack and CallBack Queue, * Render Queue, ** MicroTask Queue. When there is no one to execute in the Call Stack except Main () then Event Loop removes the Call Stack with a CallBack function from CallBack Queue to execute. (* priority of execution)
        
        Example:
        
        
        Hoisting:
        
        When the code in my text editor goes to the JavaScript compiler, the JavaScript engine pulls up all the variable declarations and sets the value of the variable undefined first (if there is a var). This is basically Hoisting. Later execution will set the value given by the programmer inside the variable. In the case of let, the value of the variable is undefined by default on the line on which we have declared the variable.
        
        Let’s be a little clearer, if we understand the Execution Context then the matter is easy. In the JavaScript program, all the global variables declared with var are first set to undefined in the Global Execution Context, and the functions are already initialized with the same name. When the code is executed, the values ​​given by the programmer sit inside the variable and the functions are executed. That’s what hosting is all about, with pre-set values.
        
        The same thing happens with Function Execution Context. As soon as the function is executed, the values ​​of all the variables declared inside it become undefined, and when the values ​​are executed, the original value sits on the variable.
        
        During compilation, the value of the variable declared as var becomes undefined.
        
        Example:
        
        
        Reference Video Link: https://www.youtube.com/watch?v=pT9xqCS8Vwk&t=0s`,
                authorId: i,
                author: {
                    id: i,
                    name: `Muhammad Rifat ${i}`,
                    image: `172138463382721749627_whatsapp_image_2024_03_02_at_90234_am.jpeg`,
                },
                tags: ['JS', 'ES6'],
                image: `172137181769870340082_download.png`,
            });
        }
        await this.createMany(blogs);
        return blogs.length;
    }
    async findAll(queryBlogDto) {
        const { page, limit, ...restQuery } = queryBlogDto;
        if (restQuery._id) {
            restQuery._id = new mongoose_2.default.Types.ObjectId(restQuery._id);
        }
        const blogs = await this.findAllByQuery(restQuery, { page, limit }, { content: 0 });
        return blogs;
    }
    async search(title, authorId) {
        const staticQuery = authorId ? { authorId } : {};
        return await this.searchByAnyCharacter({ title: title }, staticQuery);
    }
    async findOne(id) {
        const data = await this.findOneById(id);
        if (!data) {
            throw new common_1.NotFoundException('blog not found');
        }
        return data;
    }
    async findBlogByQuery(query) {
        const data = await this.findOneByQuery(query);
        if (!data) {
            throw new common_1.NotFoundException('blog not found');
        }
        return data;
    }
    async update(id, updateBlogDto) {
        const data = await this.updateById(id, updateBlogDto);
        if (!data) {
            throw new common_1.BadRequestException('update failed.');
        }
        return data;
    }
    async updateAuthor(author) {
        const result = await this.blogModel.updateMany({ authorId: author.id }, {
            $set: {
                'author.name': author.firstName + ' ' + author.lastName,
                'author.image': author.image,
                updatedAt: new Date(),
            },
        });
        console.log(result);
        return result;
    }
    async incrementViews(id) {
        try {
            await this.updateById(id, { $inc: { views: 1 } });
        }
        catch (error) {
            console.log(error);
        }
    }
    async incrementLikes(id) {
        try {
            await this.updateById(id, { $inc: { likes: 1 } });
        }
        catch (error) {
            console.log(error);
        }
    }
    async decrementLikes(id) {
        try {
            await this.updateById(id, { $inc: { likes: -1 } });
        }
        catch (error) {
            console.log(error);
        }
    }
    async incrementComments(id) {
        try {
            await this.updateById(id, { $inc: { comments: 1 } });
        }
        catch (error) {
            console.log(error);
        }
    }
    async decrementComments(id) {
        try {
            await this.updateById(id, { $inc: { comments: -1 } });
        }
        catch (error) {
            console.log(error);
        }
    }
    async remove(id) {
        const data = await this.removeById(id);
        if (!data) {
            throw new common_1.BadRequestException('delete failed.');
        }
        return data;
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogService);
//# sourceMappingURL=blog.service.js.map