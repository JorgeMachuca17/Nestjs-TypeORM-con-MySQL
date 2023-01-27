import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {

  constructor (
    private readonly usersService: UsersService,
    @InjectRepository(Post) 
    private postsRepository: Repository<Post>
    
  ){}

  async createPost(post: CreatePostDto){
    const userFound = await this.usersService.getUser(post.authorId);

    if (!userFound)
    return new HttpException(`User not found`, HttpStatus.NOT_FOUND);

    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  getPost(){
    return this.postsRepository.find()
  }

}
