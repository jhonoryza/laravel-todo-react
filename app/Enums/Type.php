<?php

namespace App\Enums;

enum Type: string
{
    case LINK = 'link';
    case NOTES = 'notes';

    public function types(): string
    {
        return match ($this) {
            self::LINK => 'link',
            self::NOTES => 'notes',
        };
    }
}
