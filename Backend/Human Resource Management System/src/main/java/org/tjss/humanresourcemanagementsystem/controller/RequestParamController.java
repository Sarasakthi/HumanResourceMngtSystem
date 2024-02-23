package org.tjss.humanresourcemanagementsystem.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



public class RequestParamController {
	
	static int ID = 1;

	// Using hashmaps instead of repository for simplicity
	public static Map<Integer, String> articleTopics = new HashMap();
	static 
	{
	    articleTopics.put(0, "GFG");
	}
	// Java Program to Illustrate Simple GET Mapping

	// Annotation
	@GetMapping("/api/v1/article")

	// Method
	public ResponseEntity<String>
	getArticleTopic(@RequestParam Integer articleId) 
	{

	    if (articleTopics.containsKey(articleId)) 
	    {
	        return ResponseEntity.ok(
	                   articleId + " " + articleTopics.get(articleId));
	    }

	    return ResponseEntity.badRequest().body(
	               "Article doesnot exists");
	}
}
