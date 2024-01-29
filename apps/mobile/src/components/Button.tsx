/**
Lune
Copyright (C) 2024 ayush.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/// The below code was taken from react-native-reuseables.
/// The code is licensed under MIT License.
/// https://github.com/mrzachnugent/react-native-reusables

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { useColorScheme } from 'nativewind';
import { Platform, Pressable, Text, View } from 'react-native';
import { cn, isTextChildren } from '~/lib/utils';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        destructive: 'bg-destructive',
        outline: 'border border-input bg-background',
        secondary: 'bg-secondary',
        ghost: '',
        link: '',
      },
      size: {
        default: 'px-4 py-2 native:px-6 native:py-3.5',
        sm: 'px-3 py-1 native:py-2',
        lg: 'px-8 py-1.5 native:py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('font-medium font-poppins-400', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const rippleColor = (isThemeDark: boolean) => {
  const secondary = isThemeDark ? 'hsl(240 4% 16%)' : 'hsl(240 5% 96%)';
  return {
    default: isThemeDark ? '#d4d4d8' : '#3f3f46',
    destructive: isThemeDark ? '#b91c1c' : '#f87171',
    outline: secondary,
    secondary: isThemeDark ? '#3f3f46' : '#e4e4e7',
    ghost: secondary,
    link: secondary,
  };
};

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof buttonVariants> & {
      textClass?: string;
      androidRootClass?: string;
    }
>(
  (
    {
      className,
      textClass,
      variant = 'default',
      size,
      children,
      androidRootClass,
      disabled,
      ...props
    },
    ref
  ) => {
    const { colorScheme } = useColorScheme();
    const Root = Platform.OS === 'android' ? View : Slot.Pressable;
    return (
      <Root
        className={cn(
          Platform.OS === 'android' && 'flex-row rounded-md overflow-hidden',
          Platform.OS === 'android' && androidRootClass
        )}
      >
        <Pressable
          className={cn(
            buttonVariants({
              variant,
              size,
              className: cn(
                className,
                disabled && 'opacity-50 web:cursor-default'
              ),
            })
          )}
          ref={ref}
          android_ripple={{
            color: rippleColor(colorScheme === 'dark')[variant as 'default'],
            borderless: false,
          }}
          disabled={disabled}
          {...props}
        >
          {isTextChildren(children)
            ? ({ pressed, hovered }) => (
                <Text
                  className={cn(
                    hovered && 'opacity-90',
                    pressed && 'opacity-70',
                    buttonTextVariants({ variant, className: textClass }),
                    disabled && 'opacity-100'
                  )}
                >
                  {children as string | string[]}
                </Text>
              )
            : children}
        </Pressable>
      </Root>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
