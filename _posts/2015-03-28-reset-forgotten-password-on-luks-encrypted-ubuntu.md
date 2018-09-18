---
title: How to Reset a Lost Password on a LUKS-Encrypted Disk in Ubuntu Linux
description: >
  I recently needed to reset a lost password on an Ubuntu installation. But the
  LUKS encryption on the disk gave me some challenges. Here's what I did.
---

Here's the situation I recently found myself in:

- Ubuntu Linux 14.10
- Unknown password for user account
- Unknown (but set) root password (Ubuntu's philosophy is to use `sudo` for everything)
- LUKS encrypted filesystem (known passphrase)
- Physical access to the computer

<!--more-->

I needed to reset my account password. Normally, with physical access to a
machine, all bets are off when it comes to security. I tried booting up the
machine into [recovery mode](https://wiki.ubuntu.com/RecoveryMode) by holding
down <kbd>shift</kbd> as soon as the BIOS had finished loading. But when I
selected the "Drop to root shell" option, I was prompted to enter the unknown
root password.

My second approach was to boot into single user mode by editing the GRUB command
script.

![Ubuntu's GRUB menu](/assets/images/ubuntu-grub.png)

By going down to the recovery mode option and hitting <kbd>e</kbd>, you can edit
the GRUB commands. By adding `init=/bin/bash` at the end of the line
beginning with `linux` that specifies the boot image, you can specify
an initial shell to use. Then I hit <kbd>F10</kbd> to boot.

After waiting for about 30 seconds or a minute, I saw a message that waiting for
the root device (the locked disk) had timed out. I was then dumped into an
[initramfs](https://wiki.ubuntu.com/Initramfs) shell. From there, I was able to
unlock the disk by running `cryptsetup luksOpen /dev/sda3 sda3_crypt`.

Next, I mounted the freshly-unlocked disk with `mount -o rw /dev/sda3 /root`,
taking advantage of the pre-existing empty directory. From there, I used
`chroot` to run `passwd` in the OS.

```
$ chroot /root passwd
$ chroot /root passwd myUserName
```

By running these commands, I successfully reset both the root password as well
as the password for my account. From there, I was able to restart the machine
and boot normally.
