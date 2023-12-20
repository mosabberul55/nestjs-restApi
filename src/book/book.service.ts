import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookService {

  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel.create(createBookDto);
  }

  findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
    if (!book) {
      throw new Error('Item not found');
    }
    return book;
  }

  async remove(id: string): Promise<any> {
    const book = await this.bookModel.findByIdAndDelete(id);
    if (!book) {
      throw new Error('Item not found');
    }
    return book;
  }
}
