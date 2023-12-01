package adventofcode2023.helpers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FileResourceUtils {

    public List<String> readAllLines(String fileName){
        InputStream inputStream = getFileFromResourceAsStream(fileName);
        List<String> lines = new ArrayList<>();

        try (InputStreamReader streamReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)){
            lines = new BufferedReader(streamReader).lines().collect(Collectors.toList());
        } catch (IOException e){
            e.printStackTrace();
        }

        return lines;
    }

    private InputStream getFileFromResourceAsStream(String fileName){
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream((fileName));

        if (inputStream == null) {
            throw new IllegalArgumentException("file not found " + fileName);
        }

        return inputStream;
    }
}
