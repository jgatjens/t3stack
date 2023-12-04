"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import type { UsersType } from "~/server/db/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "~/trpc/react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface ShowUsersProps extends React.HTMLAttributes<HTMLDivElement> {
  users: UsersType[];
  currentUserId: number;
}

export function ShowUsers({ users, currentUserId }: ShowUsersProps) {
  const randomImage = () => Math.floor(Math.random() * 5) + 1;
  return (
    <div className="space-y-8">
      {users?.map((user) => (
        <div key={user.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/0${randomImage()}.png`} alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm font-medium lowercase leading-none">
              {user?.role}
            </p>
          </div>

          <div className="ml-auto font-medium">
            {user.id !== currentUserId && <PresetActions email={user.email} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PresetActions({ email }: { email: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const deleteUser = api.user.delete.useMutation({
    onSuccess: () => {
      toast({ title: "Su usuario fue eliminado exitosamente." });
      setShowDeleteDialog(false);
      router.refresh();
    },
    onError: (error) => {
      setShowDeleteDialog(false);
      toast({
        variant: "destructive",
        title: "¡Oh, oh! Algo salió mal.",
        description: error.message,
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="mr-2">
            <span className="sr-only">Actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro??</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente
              esta cuenta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              disabled={deleteUser.isLoading}
              variant="destructive"
              onClick={() => deleteUser.mutate({ email })}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
