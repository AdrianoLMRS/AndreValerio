import React from 'react';
import { author } from "@data/author"

const name : string = author.name;
const job : string = author.job

interface props {
    style?: React.CSSProperties;
}

const AuthorHeader: React.FC<props> = ({ style }) => {
    return (
        <h1
            id='author'
            className={"page-title author "}
            style={style ? style : undefined}
            aria-label="Page Header"
            itemProp="Author"
            itemScope
            itemType="https://schema.org/Person"
            title='Page Header'
            onClick={() => { window.location.href = '/#'; }}
        >
            <strong
                className='author-name'
                itemProp='name' 
                itemType='https://schema.org/name'
                title={name}
                aria-label={`Author name: ${name}`}
            >
                {name}
            </strong> 
            <span
                className='author-job sr-only'
                itemProp='jobTitle'
                itemType='https://schema.org/jobTitle'
                title={job}
                aria-label={`Author job: ${job}`}
            >
                {job}
            </span>
        </h1>
    );
}

export default AuthorHeader