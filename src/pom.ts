export const pom = (outputDir: string, oasSpecFileNames: Array<string>) => `<project>
  <modelVersion>4.0.0</modelVersion>

  <groupId>ng.kevinki.contractualize</groupId>
  <artifactId>contractualize</artifactId>
  <version>0.3.2</version>
  <packaging>jar</packaging>

  <build>
    <plugins>
      <plugin>
        <groupId>io.swagger.codegen.v3</groupId>
        <artifactId>swagger-codegen-maven-plugin</artifactId>
        <version>3.0.27</version>
        <executions>
          ${oasSpecFileNames.map((oasSpecFileName: string) => `
            <execution>
              <id>${oasSpecFileName.replace('.oas.json', '')}</id>
              <goals>
                <goal>generate</goal>
              </goals>
              <configuration>
                <inputSpec>${outputDir}/${oasSpecFileName}</inputSpec>
                <output>${outputDir}/java/${oasSpecFileName.replace('.oas.json', '')}</output>
                <language>java</language>
                <generateApis>false</generateApis>
                <generateApiTests>false</generateApiTests>
                <generateApiDocumentation>false</generateApiDocumentation>
                <generateModels>true</generateModels>
                <generateModelTests>false</generateModelTests>
                <generateModelDocumentation>false</generateModelDocumentation>
                <generateSupportingFiles>false</generateSupportingFiles>
              </configuration>
            </execution>
          `).join('')}
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
`
