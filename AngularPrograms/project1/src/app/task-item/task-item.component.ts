import { Component } from '@angular/core';
 
@Component({
    selector: 'app-task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.css'],
    standalone: false
})
export class TaskItemComponent {
    // description: string = 'Task item description'; // Not shown in target image
    // city: string = 'New York'; // Not shown in target image
    isShow: boolean = false;
    movie_title: string = 'Top 4 movies';
    movies = [
        {
            title: 'Titanic',
            director: 'ABC',
            cast: 'person1, person2',
            releaseDate: '20th Oct 1990'
        },
        {
            title: 'Jurrasic Park',
            director: 'MNP',
            cast: 'person3, person4',
            releaseDate: '13th Oct 1989'
        },
        {
            title: 'SpiderMan',
            director: 'ABCDEF',
            cast: 'person1, person4',
            releaseDate: '20th May 2000'
        }
    ];
 
    // Properties for attribute directives
    isHighlighted: boolean = true;
    isItalic: boolean = true;
    textColor: string = 'blue';
    fontSize: number = 20;
    isActive: boolean = true;
    isDisabled: boolean = false;
    username: string = 'Jay';
}
 
 