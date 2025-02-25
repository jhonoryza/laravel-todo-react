<?php

namespace App\Enums;

enum Status: string
{
    case TODO = 'todo';
    case DONE = 'done';


    public function status(): string
    {
        return match ($this) {
            self::TODO => 'todo',
            self::DONE => 'done',
        };
    }
}

