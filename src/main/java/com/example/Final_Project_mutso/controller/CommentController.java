package com.example.Final_Project_mutso.controller;

import com.example.Final_Project_mutso.dto.CommentDto;
import com.example.Final_Project_mutso.service.CommentService;
import com.example.Final_Project_mutso.service.FeedService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Configuration
@Slf4j
@RequestMapping("/feed")
@Controller
public class CommentController {

    private final CommentService commentService;
    private final FeedService feedService;
    public CommentController(CommentService commentService, FeedService feedService) {
        this.commentService = commentService;
        this.feedService = feedService;
    }

    @PostMapping("/{feedId}") //댓글 등록
    public String createComment(
            @PathVariable("feedId") Long feedId,
            CommentDto commentDto)
    {
        commentService.createComment(feedId, commentDto);

        return String.format("redirect:/feed/%s", feedId);
    }

    @GetMapping("/{feedId}/{commentId}")
    public String deleteComment(
            @PathVariable("feedId") Long feedId,
            @PathVariable("commentId") Long commentId
    ){
        commentService.deleteComment(feedId, commentId);

        return String.format("redirect:/feed/%s", feedId);
    }
//    @PostMapping("/read")
//    public String commentWrite(
//            @PathVariable("id") Long id,
//            @RequestParam("comment") String comment) throws Exception {
//        commentService.createComment(comment);
//        BoardDTO boardDTO = new BoardDTO(id);
//        return String.format("redirect:/%s", id);
//    }
//    @GetMapping("/{id}")
//    public String comment(
//            @PathVariable("id") Long id,
//            Model model) {
//        model.addAttribute(
//                "commentList",
//                commentService.readComment(id)
//        );
//        return "read";
//    }
}
