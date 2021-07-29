package com.kms.mygram.controller.api;

import com.kms.mygram.auth.Principal;
import com.kms.mygram.domain.ChatRoom;
import com.kms.mygram.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ChatRoomApiController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/chatrooms")
    public ResponseEntity getChatRooms(@AuthenticationPrincipal Principal principal) {
        List<ChatRoom> chatRooms = chatRoomService.getChatRooms(principal.getUser());
        return new ResponseEntity(chatRooms, HttpStatus.OK);
    }

    @PostMapping("/chatrooms")
    public ResponseEntity createChatRoom(@AuthenticationPrincipal Principal principal, @RequestParam Long targetUserId) {
        ChatRoom chatRoom = chatRoomService.createChatRoom(principal.getUser().getUserId(), targetUserId);
        return new ResponseEntity(chatRoom, HttpStatus.OK);
    }
}
